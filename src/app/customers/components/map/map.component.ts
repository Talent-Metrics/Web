/// <reference types="@types/googlemaps" />
import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @ViewChild('autocomplete',{read:ElementRef, static:false}) gmapElement: ElementRef;
  @ViewChild('map',{read:ElementRef, static:false}) gmap: ElementRef;
  @Output()
  verifiedAddress = new EventEmitter<any>();
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  map: google.maps.Map;
  marker = new google.maps.Marker;
  searchForm = new FormGroup({
    autocomplete: new FormControl('')
  });
  talentMetrics = {
    lat: 32.71117809999999,
    lng: -97.39857010000003
  };
  initAutocomplete() {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: this.talentMetrics,
      zoom: 15
    });
    this.autocomplete = new google.maps.places.Autocomplete(
      this.gmapElement.nativeElement, {
        types: ['address']
      });
    this.autocomplete.bindTo('bounds', this.map);
    this.autocomplete.setTypes(['address_components', 'geometry', 'icon', 'name']);
    this.marker.setMap(this.map);
  }
  getAddress() {
    this.place = this.autocomplete.getPlace();
    const retObj = {};
    this.place.address_components.forEach(e => {
      if (e.types[0] === 'street_number') {
        retObj['number'] = e.long_name;
      } else if (e.types[0] === 'route') {
        retObj['street'] = e.long_name;
      } else if (e.types[0] === 'locality') {
        retObj['city'] = e.long_name;
      } else if (e.types[0] === 'administrative_area_level_1') {
        retObj['state'] = e.long_name;
      } else if (e.types[0] === 'postal_code') {
        retObj['zip'] = e.long_name;
      } else if (e.types[0] === 'country') {
        retObj['country'] = e.long_name;
      }
    });
    this.verifiedAddress.emit(retObj);
    if (!this.place.geometry) {
      window.alert(`No details available for input: ${this.place.name}`);
      return;
    }
    if (this.place.geometry.viewport) {
      this.map.fitBounds(this.place.geometry.viewport);
      this.marker.setPosition(this.place.geometry.location.toJSON());
      this.marker.setVisible(true);
    } else {
      this.map.setCenter(this.place.geometry.location);
      this.map.setZoom(17);  // Why 17? Because it looks good.
    }
  }
  geolocate() {
    const tester = this.autocomplete;
    const mapper = this.map;
    const mark = this.marker;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
        tester.setBounds(circle.getBounds());
        // tester.set('strictBounds', true);
        mapper.setCenter(geolocation);
        mark.setPosition(geolocation);
        mark.setVisible(true);
      });
    }
  }
  constructor() { }

  ngOnInit() {
    this.initAutocomplete();
    this.autocomplete.addListener('place_changed', () => {
      this.getAddress();
    });
  }

}
