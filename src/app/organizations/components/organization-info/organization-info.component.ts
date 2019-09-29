import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'organization-info',
  templateUrl: './organization-info.component.html',
  styleUrls: ['./organization-info.component.scss']
})
export class OrganizationInfoComponent implements OnInit, OnDestroy {
  @Input()
  parent: FormGroup;
  @Input()
  fields: any;
  unsubscribe$ = new Subject<void>();
  industries = [

       'Industry '
    ,

       'Accounting '
    ,

       'Airlines/Aviation'
    ,

       'Alternative Dispute Resolution'
    ,

       'Alternative Medicine'
    ,

       'Animation'
    ,

       'Apparel/Fashion'
    ,

       'Architecture/Planning'
    ,

       'Arts/Crafts'
    ,

       'Automotive'
    ,

       'Aviation/Aerospace'
    ,

       'Banking/Mortgage'
    ,

       'Biotechnology/Greentech'
    ,

       'Broadcast Media'
    ,

       'Building Materials'
    ,

       'Business Supplies/Equipment'
    ,

       'Capital Markets/Hedge Fund/Private Equity'
    ,

       'Chemicals'
    ,

       'Civic/Social Organization'
    ,

       'Civil Engineering'
    ,

       'Commercial Real Estate'
    ,

       'Computer Games'
    ,

       'Computer Hardware'
    ,

       'Computer Networking'
    ,

       'Computer Software/Engineering'
    ,

       'Computer/Network Security'
    ,

       'Construction'
    ,

       'Consumer Electronics'
    ,

       'Consumer Goods'
    ,

       'Consumer Services'
    ,

       'Cosmetics'
    ,

       'Dairy'
    ,

       'Defense/Space'
    ,

       'Design'
    ,

       'E-Learning'
    ,

       'Education Management'
    ,

       'Electrical/Electronic Manufacturing'
    ,

       'Entertainment/Movie Production'
    ,

       'Environmental Services'
    ,

       'Events Services'
    ,

       'Executive Office'
    ,

       'Facilities Services'
    ,

       'Farming'
    ,

       'Financial Services'
    ,

       'Fine Art'
    ,

       'Fishery'
    ,

       'Food Production'
    ,

       'Food/Beverages'
    ,

       'Fundraising'
    ,

       'Furniture'
    ,

       'Gambling/Casinos'
    ,

       'Glass/Ceramics/Concrete'
    ,

       'Government Administration'
    ,

       'Government Relations'
    ,

       'Graphic Design/Web Design'
    ,

       'Health/Fitness'
    ,

       'Higher Education/Acadamia'
    ,

       'Hospital/Health Care'
    ,

       'Hospitality'
    ,

       'Human Resources/HR'
    ,

       'Import/Export'
    ,

       'Individual/Family Services'
    ,

       'Industrial Automation'
    ,

       'Information Services'
    ,

       'Information Technology/IT'
    ,

       'Insurance'
    ,

       'International Affairs'
    ,

       'International Trade/Development'
    ,

       'Internet'
    ,

       'Investment Banking/Venture'
    ,

       'Investment Management/Hedge Fund/Private Equity'
    ,

       'Judiciary'
    ,

       'Law Enforcement'
    ,

       'Law Practice/Law Firms'
    ,

       'Legal Services'
    ,

       'Legislative Office'
    ,

       'Leisure/Travel'
    ,

       'Library'
    ,

       'Logistics/Procurement'
    ,

       'Luxury Goods/Jewelry'
    ,

       'Machinery'
    ,

       'Management Consulting'
    ,

       'Maritime'
    ,

       'Market Research'
    ,

       'Marketing/Advertising/Sales'
    ,

       'Mechanical or Industrial Engineering'
    ,

       'Media Production'
    ,

       'Medical Equipment'
    ,

       'Medical Practice'
    ,

       'Mental Health Care'
    ,

       'Military Industry'
    ,

       'Mining/Metals'
    ,

       'Motion Pictures/Film'
    ,

       'Museums/Institutions'
    ,

       'Music'
    ,

       'Nanotechnology'
    ,

       'Newspapers/Journalism'
    ,

       'Non-Profit/Volunteering'
    ,

       'Oil/Energy/Solar/Greentech'
    ,

       'Online Publishing'
    ,

       'Other Industry'
    ,

       'Outsourcing/Offshoring'
    ,

       'Package/Freight Delivery'
    ,

       'Packaging/Containers'
    ,

       'Paper/Forest Products'
    ,

       'Performing Arts'
    ,

       'Pharmaceuticals'
    ,

       'Philanthropy'
    ,

       'Photography'
    ,

       'Plastics'
    ,

       'Political Organization'
    ,

       'Primary/Secondary Education'
    ,

       'Printing'
    ,

       'Professional Training'
    ,

       'Program Development'
    ,

       'Public Relations/PR'
    ,

       'Public Safety'
    ,

       'Publishing Industry'
    ,

       'Railroad Manufacture'
    ,

       'Ranching'
    ,

       'Real Estate/Mortgage'
    ,

       'Recreational Facilities/Services'
    ,

       'Religious Institutions'
    ,

       'Renewables/Environment'
    ,

       'Research Industry'
    ,

       'Restaurants'
    ,

       'Retail Industry'
    ,

       'Security/Investigations'
    ,

       'Semiconductors'
    ,

       'Shipbuilding'
    ,

       'Sporting Goods'
    ,

       'Sports'
    ,

       'Staffing/Recruiting'
    ,

       'Supermarkets'
    ,

       'Telecommunications'
    ,

       'Textiles'
    ,

       'Think Tanks'
    ,

       'Tobacco'
    ,

       'Translation/Localization'
    ,

       'Transportation'
    ,

       'Utilities'
    ,

       'Venture Capital/VC'
    ,

       'Veterinary'
    ,

       'Warehousing'
    ,

       'Wholesale'
    ,

       'Wine/Spirits'
    ,

       'Wireless'
    ,

       'Writing/Editing'

  ];
  orgSizes = [
    { key: '0 - 100', value: 100 },
    { key: '101 - 500', value: 500 },
    { key: '501 - 1000', value: 1000 },
    { key: '1001 - 5000', value: 5000 },
    { key: '5001 - 10000', value: 10000 },
    { key: '10000+', value: 99999 }
  ];
  regions = [
    { key: 1, value: 'Midwest' },
    { key: 2, value: 'Northeast' },
    { key: 3, value: 'Southeast' },
    { key: 4, value: 'Southwest' },
    { key: 5, value: 'West' }
  ];
  revenues = [
    { key: 1, value: 'Under $100,000' },
    { key: 2, value: '$100,001 - $250,000' },
    { key: 3, value: '$250,001 - $500,000' },
    { key: 4, value: '$500,001 - $1,000,000' },
    { key: 5, value: '$1,000,001 - $5,000,000' },
    { key: 6, value: 'Over $5,000,000' }
  ];
  states = [
    {
      value: 'Alabama',
      key: 'AL'
    },
    {
      value: 'Alaska',
      key: 'AK'
    },
    {
      value: 'American Samoa',
      key: 'AS'
    },
    {
      value: 'Arizona',
      key: 'AZ'
    },
    {
      value: 'Arkansas',
      key: 'AR'
    },
    {
      value: 'California',
      key: 'CA'
    },
    {
      value: 'Colorado',
      key: 'CO'
    },
    {
      value: 'Connecticut',
      key: 'CT'
    },
    {
      value: 'Delaware',
      key: 'DE'
    },
    {
      value: 'District Of Columbia',
      key: 'DC'
    },
    {
      value: 'Federated States Of Micronesia',
      key: 'FM'
    },
    {
      value: 'Florida',
      key: 'FL'
    },
    {
      value: 'Georgia',
      key: 'GA'
    },
    {
      value: 'Guam',
      key: 'GU'
    },
    {
      value: 'Hawaii',
      key: 'HI'
    },
    {
      value: 'Idaho',
      key: 'ID'
    },
    {
      value: 'Illinois',
      key: 'IL'
    },
    {
      value: 'Indiana',
      key: 'IN'
    },
    {
      value: 'Iowa',
      key: 'IA'
    },
    {
      value: 'Kansas',
      key: 'KS'
    },
    {
      value: 'Kentucky',
      key: 'KY'
    },
    {
      value: 'Louisiana',
      key: 'LA'
    },
    {
      value: 'Maine',
      key: 'ME'
    },
    {
      value: 'Marshall Islands',
      key: 'MH'
    },
    {
      value: 'Maryland',
      key: 'MD'
    },
    {
      value: 'Massachusetts',
      key: 'MA'
    },
    {
      value: 'Michigan',
      key: 'MI'
    },
    {
      value: 'Minnesota',
      key: 'MN'
    },
    {
      value: 'Mississippi',
      key: 'MS'
    },
    {
      value: 'Missouri',
      key: 'MO'
    },
    {
      value: 'Montana',
      key: 'MT'
    },
    {
      value: 'Nebraska',
      key: 'NE'
    },
    {
      value: 'Nevada',
      key: 'NV'
    },
    {
      value: 'New Hampshire',
      key: 'NH'
    },
    {
      value: 'New Jersey',
      key: 'NJ'
    },
    {
      value: 'New Mexico',
      key: 'NM'
    },
    {
      value: 'New York',
      key: 'NY'
    },
    {
      value: 'North Carolina',
      key: 'NC'
    },
    {
      value: 'North Dakota',
      key: 'ND'
    },
    {
      value: 'Northern Mariana Islands',
      key: 'MP'
    },
    {
      value: 'Ohio',
      key: 'OH'
    },
    {
      value: 'Oklahoma',
      key: 'OK'
    },
    {
      value: 'Oregon',
      key: 'OR'
    },
    {
      value: 'Palau',
      key: 'PW'
    },
    {
      value: 'Pennsylvania',
      key: 'PA'
    },
    {
      value: 'Puerto Rico',
      key: 'PR'
    },
    {
      value: 'Rhode Island',
      key: 'RI'
    },
    {
      value: 'South Carolina',
      key: 'SC'
    },
    {
      value: 'South Dakota',
      key: 'SD'
    },
    {
      value: 'Tennessee',
      key: 'TN'
    },
    {
      value: 'Texas',
      key: 'TX'
    },
    {
      value: 'Utah',
      key: 'UT'
    },
    {
      value: 'Vermont',
      key: 'VT'
    },
    {
      value: 'Virgin Islands',
      key: 'VI'
    },
    {
      value: 'Virginia',
      key: 'VA'
    },
    {
      value: 'Washington',
      key: 'WA'
    },
    {
      value: 'West Virginia',
      key: 'WV'
    },
    {
      value: 'Wisconsin',
      key: 'WI'
    },
    {
      value: 'Wyoming',
      key: 'WY'
    }
  ];
  constructor() { }

  ngOnInit() {
    // console.log(this.industries);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
