export interface Subscriber {
    id: number;
    email: string;
    subscribedAt: string;
    isActive: boolean;
  }
  
  export interface PostData {
    id: string | number;
    title: string;
    excerpt?: string;
    description?: string;
    url?: string;
    slug?: string;
  }
  
  export interface EmailJSResponse {
    status: number;
    text: string;
  }
  
  export interface EmailTemplateParams {
    to_email: string;
    to_name: string;
    from_name?: string;
    blog_name?: string;
    post_title?: string;
    post_excerpt?: string;
    post_url?: string;
  }
  
  export interface EmailJSConfig {
    SERVICE_ID: string;
    NEW_POST_TEMPLATE_ID: string;
    WELCOME_TEMPLATE_ID: string;
    PUBLIC_KEY: string;
  }
  