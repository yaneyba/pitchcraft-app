import { IAIProvider } from './types';
import { generatePitch, analyzePitch, generateMarketingSuggestions } from '../utils/api';

export class GeminiAIProvider implements IAIProvider {
  async generatePitch(input: string, style: string): Promise<string> {
    return await generatePitch(input, style);
  }

  async analyzePitch(pitch: string): Promise<string> {
    return await analyzePitch(pitch);
  }

  async generateMarketingSuggestions(input: string): Promise<string> {
    return await generateMarketingSuggestions(input);
  }
}

export class MockAIProvider implements IAIProvider {
  async generatePitch(input: string, style: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return `[MOCK] This is a ${style} pitch for: ${input}. 

Key highlights:
- Revolutionary approach to solving user problems
- Scalable business model with strong market potential  
- Experienced team with proven track record
- Clear path to profitability and growth

This innovative solution addresses critical market needs while delivering exceptional value to users.`;
  }

  async analyzePitch(pitch: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const pitchLength = pitch.length;
    
    return `**Strengths**
* Clear value proposition
* Well-structured presentation (${pitchLength} characters)
* Addresses market need

**Weaknesses**
* Could use more specific metrics
* Market size analysis needed
* Competition analysis missing

**Suggestions**
* Add quantifiable results and projections
* Include detailed competitive landscape
* Strengthen the call-to-action`;
  }

  async generateMarketingSuggestions(input: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return `**Catchy Slogans:**
* "Innovation Meets Opportunity"
* "The Future of ${input.split(' ')[0]} is Here"
* "Transform Your World Today"

**Marketing Angles:**
* LinkedIn Strategy: B2B thought leadership content targeting decision makers
* TikTok Campaign: Short-form videos showcasing product benefits and user testimonials  
* Content Marketing: Educational blog series establishing expertise and driving organic traffic`;
  }
}