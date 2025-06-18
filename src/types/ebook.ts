import { ReactNode } from 'react';

export interface ContentBlock {
  type: 'text' | 'quote' | 'highlight' | 'warning' | 'list' | 'subtitle';
  value?: string;
  items?: string[];
}

export interface Chapter {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
  content: ContentBlock[];
  highlights?: string[];
  keyTakeaways?: string[];
}

export interface EbookData {
  title: string;
  subtitle: string;
  author: string;
  chapters: Chapter[];
}