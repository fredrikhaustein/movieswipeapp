  type StreamingMovieType = {
    id:string,
    service: string,
    apiKey: string,
  }
  
  export const streamingServiceList: StreamingMovieType[] = [
      {
        id: "Disney",
        service: "Disney",
        apiKey: "disney",
      },
      {
        id: "Netflix",
        service: "Netflix",
        apiKey: "netflix",
      },
      {
        id: "Prime",
        service: "Prime",
        apiKey: "prime",
      },
      {
        id: "HBO",
        service: "HBO",
        apiKey: "hbo",
      },
      {
        id: "AppleTV",
        service: "Apple",
        apiKey: "apple",
      },
    ];