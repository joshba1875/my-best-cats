export default function errorHandler(response: Response){
    switch(response.status){
            case 400: return "Invalid fetch request";
              break;
            case 404: return "Api endpoint  not found";
              break;
            default: return "Internal Server Error, please contact customer support";
          }
}