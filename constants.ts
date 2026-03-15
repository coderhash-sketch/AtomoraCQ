
export interface CityData {
  id: string;
  name: string;
  country: string;
  pollution: number; // 0-100 (lower is better)
  greenCoverage: number; // 0-100
  renewableEnergy: number; // 0-100
  policyScore: number; // 0-100
  lat: number; // SVG coordinates 0-100
  lng: number; // SVG coordinates 0-100
}

export const CITIES: CityData[] = [
  { id: 'c1', name: 'Singapore', country: 'Singapore', pollution: 32, greenCoverage: 94, renewableEnergy: 18, policyScore: 92, lat: 65, lng: 80 },
  { id: 'c2', name: 'New York', country: 'USA', pollution: 52, greenCoverage: 48, renewableEnergy: 28, policyScore: 72, lat: 40, lng: 25 },
  { id: 'c3', name: 'New Delhi', country: 'India', pollution: 91, greenCoverage: 18, renewableEnergy: 16, policyScore: 52, lat: 50, lng: 72 },
  { id: 'c4', name: 'Gurugram', country: 'India', pollution: 84, greenCoverage: 14, renewableEnergy: 11, policyScore: 58, lat: 51, lng: 71 },
  { id: 'c5', name: 'Noida', country: 'India', pollution: 86, greenCoverage: 19, renewableEnergy: 13, policyScore: 56, lat: 51, lng: 72 },
  { id: 'c6', name: 'Faridabad', country: 'India', pollution: 88, greenCoverage: 11, renewableEnergy: 9, policyScore: 48, lat: 52, lng: 72 },
  { id: 'c7', name: 'Patna', country: 'India', pollution: 93, greenCoverage: 9, renewableEnergy: 6, policyScore: 42, lat: 52, lng: 75 },
  { id: 'c8', name: 'Lucknow', country: 'India', pollution: 78, greenCoverage: 26, renewableEnergy: 12, policyScore: 55, lat: 52, lng: 73 },
  { id: 'c9', name: 'Ghaziabad', country: 'India', pollution: 87, greenCoverage: 16, renewableEnergy: 11, policyScore: 50, lat: 51, lng: 72 },
  { id: 'c10', name: 'Chandigarh', country: 'India', pollution: 28, greenCoverage: 82, renewableEnergy: 38, policyScore: 88, lat: 47, lng: 71 },
  { id: 'c11', name: 'Bhiwadi', country: 'India', pollution: 95, greenCoverage: 7, renewableEnergy: 4, policyScore: 38, lat: 51, lng: 70 },
  { id: 'c12', name: 'Bhutan', country: 'Bhutan', pollution: 8, greenCoverage: 97, renewableEnergy: 99, policyScore: 95, lat: 52, lng: 77 },
  { id: 'c13', name: 'Hong Kong', country: 'China', pollution: 42, greenCoverage: 42, renewableEnergy: 12, policyScore: 78, lat: 58, lng: 82 },
  { id: 'c14', name: 'Beijing', country: 'China', pollution: 68, greenCoverage: 28, renewableEnergy: 22, policyScore: 82, lat: 42, lng: 82 },
  { id: 'c15', name: 'Moscow', country: 'Russia', pollution: 53, greenCoverage: 52, renewableEnergy: 17, policyScore: 62, lat: 25, lng: 55 },
  { id: 'c16', name: 'Seoul', country: 'South Korea', pollution: 46, greenCoverage: 38, renewableEnergy: 23, policyScore: 85, lat: 45, lng: 85 },
  { id: 'c17', name: 'Paris', country: 'France', pollution: 43, greenCoverage: 43, renewableEnergy: 32, policyScore: 92, lat: 32, lng: 49 },
  { id: 'c18', name: 'Tokyo', country: 'Japan', pollution: 36, greenCoverage: 32, renewableEnergy: 27, policyScore: 94, lat: 48, lng: 88 },
  { id: 'c19', name: 'California', country: 'USA', pollution: 27, greenCoverage: 68, renewableEnergy: 78, policyScore: 97, lat: 42, lng: 12 },
  { id: 'c20', name: 'Seattle', country: 'USA', pollution: 22, greenCoverage: 75, renewableEnergy: 91, policyScore: 95, lat: 35, lng: 15 },
  { id: 'c21', name: 'Indore', country: 'India', pollution: 44, greenCoverage: 41, renewableEnergy: 36, policyScore: 77, lat: 55, lng: 70 },
  { id: 'c22', name: 'Vijayawada', country: 'India', pollution: 49, greenCoverage: 36, renewableEnergy: 31, policyScore: 67, lat: 58, lng: 73 },
  { id: 'c23', name: 'Chennai', country: 'India', pollution: 58, greenCoverage: 37, renewableEnergy: 42, policyScore: 75, lat: 62, lng: 73 },
  { id: 'c24', name: 'Mumbai', country: 'India', pollution: 72, greenCoverage: 26, renewableEnergy: 22, policyScore: 70, lat: 58, lng: 69 },
  { id: 'c25', name: 'Nagpur', country: 'India', pollution: 54, greenCoverage: 47, renewableEnergy: 32, policyScore: 73, lat: 56, lng: 72 },
  { id: 'c26', name: 'Hyderabad', country: 'India', pollution: 64, greenCoverage: 32, renewableEnergy: 27, policyScore: 72, lat: 57, lng: 72 },
  { id: 'c27', name: 'Pune', country: 'India', pollution: 61, greenCoverage: 36, renewableEnergy: 29, policyScore: 74, lat: 58, lng: 70 },
  { id: 'c28', name: 'Dehradun', country: 'India', pollution: 33, greenCoverage: 78, renewableEnergy: 47, policyScore: 75, lat: 49, lng: 72 },
  { id: 'c29', name: 'Jammu', country: 'India', pollution: 39, greenCoverage: 67, renewableEnergy: 52, policyScore: 62, lat: 46, lng: 70 },
  { id: 'c30', name: 'Rohtak', country: 'India', pollution: 74, greenCoverage: 22, renewableEnergy: 17, policyScore: 58, lat: 50, lng: 71 },
  { id: 'c31', name: 'Kashmir', country: 'India', pollution: 18, greenCoverage: 88, renewableEnergy: 62, policyScore: 68, lat: 45, lng: 71 },
  { id: 'c32', name: 'Shimla', country: 'India', pollution: 16, greenCoverage: 93, renewableEnergy: 63, policyScore: 78, lat: 47, lng: 72 },
  { id: 'c33', name: 'Jalandhar', country: 'India', pollution: 76, greenCoverage: 24, renewableEnergy: 14, policyScore: 57, lat: 48, lng: 70 },
  { id: 'c34', name: 'Guwahati', country: 'India', pollution: 41, greenCoverage: 72, renewableEnergy: 27, policyScore: 68, lat: 52, lng: 78 },
  { id: 'c35', name: 'Dhaka', country: 'Bangladesh', pollution: 87, greenCoverage: 14, renewableEnergy: 11, policyScore: 52, lat: 55, lng: 78 },
  { id: 'c36', name: 'Kathmandu', country: 'Nepal', pollution: 71, greenCoverage: 42, renewableEnergy: 32, policyScore: 58, lat: 52, lng: 76 },
  { id: 'c37', name: 'Gangtok', country: 'India', pollution: 14, greenCoverage: 94, renewableEnergy: 87, policyScore: 82, lat: 52, lng: 77 },
  { id: 'c38', name: 'Lahore', country: 'Pakistan', pollution: 94, greenCoverage: 11, renewableEnergy: 7, policyScore: 42, lat: 50, lng: 69 },
  { id: 'c39', name: 'Gandhinagar', country: 'India', pollution: 26, greenCoverage: 87, renewableEnergy: 52, policyScore: 90, lat: 55, lng: 68 },
  { id: 'c40', name: 'Pondicherry', country: 'India', pollution: 34, greenCoverage: 52, renewableEnergy: 42, policyScore: 78, lat: 63, lng: 73 },
  { id: 'c41', name: 'Udupi', country: 'India', pollution: 23, greenCoverage: 72, renewableEnergy: 47, policyScore: 80, lat: 61, lng: 70 },
  { id: 'c42', name: 'Shillong', country: 'India', pollution: 21, greenCoverage: 90, renewableEnergy: 57, policyScore: 75, lat: 53, lng: 79 },
  { id: 'c43', name: 'Siliguri', country: 'India', pollution: 44, greenCoverage: 62, renewableEnergy: 22, policyScore: 65, lat: 52, lng: 77 },
  { id: 'c44', name: 'Kabul', country: 'Afghanistan', pollution: 90, greenCoverage: 8, renewableEnergy: 4, policyScore: 28, lat: 48, lng: 65 },
  { id: 'c45', name: 'Karachi', country: 'Pakistan', pollution: 86, greenCoverage: 16, renewableEnergy: 13, policyScore: 50, lat: 55, lng: 65 },
  { id: 'c46', name: 'Wellington', country: 'New Zealand', pollution: 11, greenCoverage: 87, renewableEnergy: 97, policyScore: 99, lat: 85, lng: 95 },
  { id: 'c47', name: 'Amsterdam', country: 'Netherlands', pollution: 24, greenCoverage: 57, renewableEnergy: 72, policyScore: 94, lat: 31, lng: 47 },
  { id: 'c48', name: 'Auckland', country: 'New Zealand', pollution: 14, greenCoverage: 82, renewableEnergy: 92, policyScore: 97, lat: 82, lng: 94 },
  { id: 'c49', name: 'Adelaide', country: 'Australia', pollution: 19, greenCoverage: 67, renewableEnergy: 87, policyScore: 95, lat: 80, lng: 85 },
  { id: 'c50', name: 'Bangalore', country: 'India', pollution: 56, greenCoverage: 46, renewableEnergy: 31, policyScore: 80, lat: 61, lng: 72 },
  { id: 'c51', name: 'Mysuru', country: 'India', pollution: 21, greenCoverage: 77, renewableEnergy: 42, policyScore: 84, lat: 63, lng: 72 },
  { id: 'c52', name: 'Amravati', country: 'India', pollution: 38, greenCoverage: 57, renewableEnergy: 37, policyScore: 72, lat: 57, lng: 72 },
  { id: 'c53', name: 'Bhubaneshwar', country: 'India', pollution: 47, greenCoverage: 62, renewableEnergy: 27, policyScore: 74, lat: 57, lng: 75 },
  { id: 'c54', name: 'Ranchi', country: 'India', pollution: 53, greenCoverage: 52, renewableEnergy: 22, policyScore: 67, lat: 54, lng: 74 },
  { id: 'c55', name: 'Raipur', country: 'India', pollution: 59, greenCoverage: 47, renewableEnergy: 17, policyScore: 64, lat: 56, lng: 74 },
  { id: 'c56', name: 'Greater Noida', country: 'India', pollution: 83, greenCoverage: 23, renewableEnergy: 16, policyScore: 63, lat: 51, lng: 72 },
  { id: 'c57', name: 'Hutan', country: 'China', pollution: 73, greenCoverage: 27, renewableEnergy: 11, policyScore: 57, lat: 45, lng: 80 },
  { id: 'c58', name: 'Oslo', country: 'Norway', pollution: 13, greenCoverage: 87, renewableEnergy: 97, policyScore: 99, lat: 20, lng: 50 },
  { id: 'c59', name: 'Zurich', country: 'Switzerland', pollution: 17, greenCoverage: 77, renewableEnergy: 82, policyScore: 96, lat: 30, lng: 50 },
  { id: 'c60', name: 'Stockholm', country: 'Sweden', pollution: 11, greenCoverage: 82, renewableEnergy: 94, policyScore: 97, lat: 18, lng: 52 },
  { id: 'c61', name: 'Copenhagen', country: 'Denmark', pollution: 13, greenCoverage: 80, renewableEnergy: 92, policyScore: 98, lat: 25, lng: 48 },
];
