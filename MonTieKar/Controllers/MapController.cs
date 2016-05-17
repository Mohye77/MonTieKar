using Microsoft.AspNet.Identity.Owin;
using MonTieKar.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using Microsoft.Azure.Documents.Client;
using Newtonsoft.Json;

namespace MonTieKar.Controllers
{

    public class MapController : ApiController
    {
        private const string _url = "https://pariscube.documents.azure.com:443";
        private DocumentClient _client;
        private Uri _collectionUri;

        public MapController()
        {
            var primaryKey = "0rGKNEJSUq3sDhbwXQQmc4Db7ra7KULweE7HWSUYdKM1RNzBIKv3ogz42WODZ7G0Wz9LlLy16dFvtMhYKyqDOA==";


            _client = new DocumentClient(new Uri(_url), primaryKey);

            _collectionUri = UriFactory.CreateDocumentCollectionUri("pariscubedata", "data");

        }


        // Post api/Map
        public MapViewModel Post(PostRequest request)
        {
            //TODO: get criterias
            var queryOptions = new FeedOptions { MaxItemCount = -1 };


            var serverData =
                _client.CreateDocumentQuery<ZoneData>(_collectionUri, "SELECT * FROM data", queryOptions).ToList();


            var mappedCriteriaList = new List<MappedCriteria>();


            foreach (var data in serverData)
            {
                var result = new MappedCriteria()
                {
                    Coords = new Coordinates()
                    {
                        Latitude = data.LatitudeIndex,
                        Longitude = data.LongitudeIndex
                    },
                    CriteriaNumber = 0

                };


                foreach (var filter in request.Filters)
                {
                    int? count = null;

                    switch (filter.Name)
                    {
                        case "cafe":
                            count = data.CoffeeShops;
                            break;

                        case "velib":
                            count = data.VelibCount;
                            break;
                        case "cine":
                            count = data.CinemaCount;
                            break;
                        case "arbre":
                            count = data.TreeCount;
                            break;

                        default:
                            continue;
                    }

                    if (count == null)
                    {
                        continue;

                    }

                    switch (filter.Operator)
                    {
                        case "eq":
                            if (count == filter.Score)
                            {
                                result.CriteriaNumber++;
                            }

                            break;

                        case "lt":
                            if (count < filter.Score)
                            {
                                result.CriteriaNumber++;
                            }
                            break;

                        case "gt":
                            if (count > filter.Score)
                            {
                                result.CriteriaNumber++;
                            }
                            break;
                        default:
                            break;
                    }
                }



                mappedCriteriaList.Add(result);
            }


            // Map them
            return new MapViewModel
            {
                MappedCriteria = mappedCriteriaList
            };
        }

    }

    public class PostRequest
    {
        public List<Filter> Filters { get; set; }
    }

    public class Filter
    {
        public string Name { get; set; }
        public string Operator { get; set; }
        public int Score { get; set; }
    }


    public class ZoneData
    {
        public int LongitudeIndex { get; set; }

        public int LatitudeIndex { get; set; }


        public int? VelibCount { get; set; }

        public int? CoffeeShops { get; set; }


        public int? TreeCount { get; set; }

        public int? CinemaCount { get; set; }

        [JsonProperty(PropertyName = "id")]
        public Guid Id { get; set; }
    }
}
