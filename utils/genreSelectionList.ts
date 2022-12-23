type GenreType = {
    id:string,
    service: string
    apiKey: string
  }
  
  export const genreListSingular = 
  [
    "Crime", "Action", "Horror",
    "Comedy", "Documentory", "Western",
    "War", "Family", "Romance",
  ]

  export const genreList: GenreType[] = [
      {
        id: "Crime",
        service: "Crime",
        apiKey: "878",
      },
      {
        id: "Action",
        service: "Action",
        apiKey: "28",
      },
      {
        id: "Horror",
        service: "Horror",
        apiKey: "27",
      },
      {
        id: "Comedy",
        service: "Comedy",
        apiKey: "35",
      },
      {
        id: "Documentary",
        service: "Documentary",
        apiKey: "99",
      },
      {
        id: "Western",
        service: "Western",
        apiKey: "37",
      },
      {
        id: "War",
        service: "War",
        apiKey: "10752",
      }, 
      {
        id: "Family", 
        service: "Family", 
        apiKey: "10751",
      },
      {
        id: "Romance",
        service: "Romance",
        apiKey: "10749"
      }

    ];

    
    /* ID => Sjanger mapping om du vil legge til flere 
    {"1":"Biography","10402":"Music","10749":"Romance",
    "10751":"Family","10752":"War","10763":"News",
    "10764":"Reality","10767":"Talk Show","12":"Adventure",
    "14":"Fantasy","16":"Animation","18":"Drama","2":"Film Noir",
    "27":"Horror","28":"Action","3":"Game Show","35":"Comedy",
    "36":"History","37":"Western","4":"Musical","5":"Sport",
    "53":"Thriller","6":"Short","7":"Adult","80":"Crime",
    "878":"Science Fiction","9648":"Mystery","99":"Documentary"} */ 