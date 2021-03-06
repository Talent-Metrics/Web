/// <reference types="@types/googlemaps" />
import {Component, ElementRef, EventEmitter, Output, ViewChild, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.scss']
})

export class AppMapComponent implements AfterViewInit {
  @ViewChild('autocomplete', { read: ElementRef, static: false}) gmapElement: ElementRef;
  @ViewChild('map', {read: ElementRef, static: false}) gmap: ElementRef;
  @Output()

  verifiedAddress = new EventEmitter<any>();
  autocomplete: google.maps.places.Autocomplete;
  place: google.maps.places.PlaceResult;
  map: google.maps.Map;
  marker = new google.maps.Marker;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  searchForm = new FormGroup({
    autocomplete: new FormControl('')
  });

  talentMetrics = {
    lat: 32.71117809999999,
    lng: -97.39857010000003
  };

  initAutocomplete() {
    try {
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
    } catch (error) {
      console.log('Error occurred. Error code: ' + error.code);
    }
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
      this._snackBar.open(`No details available for input: ${this.place.name}`, 'Clear', {
        duration: 2000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
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
  geolocate(t: any) {
    const tester = this.autocomplete;
    const mapper = this.map;
    const mark = this.marker;
    if (navigator.geolocation) {
      // violation
      navigator.geolocation.getCurrentPosition(
        function(position) {
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
      },
      function(error) {
        console.log('Error occurred. Error code: ' + error.code);
        // error.code can be:
        //   0: unknown error
        //   1: permission denied
        //   2: position unavailable (error response from location provider)
        //   3: timed out
      },
      );
    }
  }
  constructor(
    private _snackBar: MatSnackBar
    ) { }

  ngAfterViewInit() {
    this.initAutocomplete();
    this.autocomplete.addListener('place_changed', () => {
      this.getAddress();
    });
  }

}
