
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { AdRequest, AdType, Platform, ImageSize, AspectRatio } from "../types";

// Note: process.env.API_KEY is handled by the environment.
// For Veo/Pro models, we might use a dynamic key via window.aistudio.

export async function generateTextAds(request: AdRequest) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Generate ${request.variations} distinct ad variations for the following:
  Product: ${request.productName}
  Description: ${request.description}
  Target Audience: ${request.audience}
  Tone: ${request.tone}
  Call to Action: ${request.cta}
  Platforms: ${request.platforms.join(', ')}
  
  Provide each variation in a JSON format suitable for an advertising platform. 
  Focus on the unique nuances of each platform: 
  - Instagram: Visual, hashtag usage
  - LinkedIn: Professional, value-driven
  - TikTok: Hook-heavy, casual
  etc.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            platform: { type: Type.STRING },
            headline: { type: Type.STRING },
            body: { type: Type.STRING },
            cta: { type: Type.STRING }
          },
          required: ["platform", "headline", "body", "cta"]
        }
      }
    }
  });

  const groundingUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
    ?.filter(chunk => chunk.web)
    ?.map(chunk => ({ title: chunk.web?.title || '', uri: chunk.web?.uri || '' })) || [];

  return {
    ads: JSON.parse(response.text),
    groundingUrls
  };
}

export async function generateImageAd(
  request: AdRequest, 
  size: ImageSize = '1K', 
  aspect: AspectRatio = '1:1'
) {
  // Use gemini-3-pro-image-preview for high quality
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Professional ad visual for ${request.productName}. 
  Context: ${request.description}. 
  Aesthetic: ${request.tone}. 
  Targeting: ${request.audience}. 
  Ensure no cluttered text. Minimalist, modern, high-contrast.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: aspect as any,
        imageSize: size as any
      },
      tools: [{ googleSearch: {} }] // Only available on pro image
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to generate image.");
}

export async function editImage(base64Image: string, editPrompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const mimeType = base64Image.split(';')[0].split(':')[1];
  const data = base64Image.split(',')[1];

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data, mimeType } },
        { text: editPrompt }
      ]
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  throw new Error("Failed to edit image.");
}

export async function generateVideoAd(request: AdRequest, aspect: AspectRatio = '16:9') {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `A professional, dynamic video ad for ${request.productName}. 
  Theme: ${request.tone}. 
  Content: ${request.description}. 
  Targeted at: ${request.audience}. 
  Fast pacing, modern transitions, 1080p high quality.`;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: aspect as any
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video generation failed.");
  
  const res = await fetch(downloadLink, {
    headers: {
      'x-goog-api-key': process.env.API_KEY || ''
    }
  });
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}
