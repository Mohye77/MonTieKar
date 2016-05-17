using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MonTieKar.Models
{
    public class MapViewModel
    {
        public List<MappedCriteria> MappedCriteria { get; set; }
    }

    public class MappedCriteria
    {
        public Coordinates Coords { get; set; }
        public int CriteriaNumber { get; set; }
    }

    public class Coordinates
    {
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
    }
}