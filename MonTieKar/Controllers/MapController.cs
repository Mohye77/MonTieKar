using Microsoft.AspNet.Identity.Owin;
using MonTieKar.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace MonTieKar.Controllers
{
    [Authorize]
    public class MapController : ApiController
    {
        private ApplicationUserManager _userManager;

        public MapController()
        {
        }

        public MapController(ApplicationUserManager userManager)
        {
            UserManager = userManager;
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // Post api/Map
        public MapViewModel Post(PostRequest request)
        {
            //TODO: get criterias

            // Map them
            return new MapViewModel
            {
                MappedCriteria = new List<MappedCriteria>()
                {
                    new MappedCriteria
                    {
                        Coords = new Coordinates { Latitude = 0, Longitude = 0 },
                        CriteriaNumber = 3
                    }
                }
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
}
