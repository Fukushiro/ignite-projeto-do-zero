export interface PostData {
  id: string;
  uid: string;
  first_publication_date: string;
  data: {
    title: string;
    subtitle: string;
    author: string;
    banner: {
      dimensions: { width: number; height: number };
      url: string;
    };
    content: { heading: string; body: { type: string; text: string }[] }[];
  };
}
