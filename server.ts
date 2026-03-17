import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- Climate Digital Twin Engine Logic ---

  const CITIES_DB: Record<string, any> = {
    'New Delhi': { baseAqi: 180, trafficDensity: 0.8, industrialEmissions: 120, lat: 28.6139, lon: 77.2090 },
    'New York': { baseAqi: 45, trafficDensity: 0.6, industrialEmissions: 30, lat: 40.7128, lon: -74.0060 },
    'London': { baseAqi: 55, trafficDensity: 0.5, industrialEmissions: 40, lat: 51.5074, lon: -0.1278 },
    'Beijing': { baseAqi: 110, trafficDensity: 0.7, industrialEmissions: 150, lat: 39.9042, lon: 116.4074 },
    'Mumbai': { baseAqi: 140, trafficDensity: 0.9, industrialEmissions: 80, lat: 19.0760, lon: 72.8777 }
  };

  /**
   * Simple Gaussian Plume Model for pollution dispersion
   */
  const simulateDispersion = (params: any) => {
    const { windSpeed, windDirection, sourceStrength, sourceHeight, trafficDensity } = params;
    const heatmap = [];
    const resolution = 10; // increased resolution

    // Add multiple sources (Industrial + Traffic)
    const sources = [
      { x: 50, y: 50, strength: sourceStrength }, // Industrial
      { x: 30, y: 70, strength: trafficDensity * 100 }, // Traffic Hub A
      { x: 70, y: 30, strength: trafficDensity * 80 }   // Traffic Hub B
    ];

    for (let x = 0; x <= 100; x += resolution) {
      for (let y = 0; y <= 100; y += resolution) {
        let totalConcentration = 0;

        sources.forEach(source => {
          const dx = x - source.x;
          const dy = y - source.y;
          
          const angle = (windDirection * Math.PI) / 180;
          const rx = dx * Math.cos(angle) + dy * Math.sin(angle);
          const ry = -dx * Math.sin(angle) + dy * Math.cos(angle);

          if (rx > 0) {
            const sigmaY = 0.15 * rx + 1; // Added dispersion constant
            const sigmaZ = 0.1 * rx + 1;
            const conc = (source.strength / (windSpeed * sigmaY * sigmaZ)) * 
                            Math.exp(-(ry ** 2) / (2 * sigmaY ** 2));
            totalConcentration += conc;
          }
        });

        heatmap.push({ x, y, value: Math.min(100, totalConcentration * 5) });
      }
    }
    return heatmap;
  };

  // --- REST APIs ---

  // 1. Simulate Pollution Dispersion
  app.post('/api/simulate-pollution', (req, res) => {
    const { city, windSpeed, windDirection, emissions, traffic } = req.body;
    const cityData = CITIES_DB[city] || CITIES_DB['New Delhi'];
    
    const heatmap = simulateDispersion({
      windSpeed: windSpeed || 5,
      windDirection: windDirection || 0,
      sourceStrength: emissions || cityData.industrialEmissions,
      trafficDensity: traffic || cityData.trafficDensity,
      sourceHeight: 10,
    });

    res.json({
      city,
      timestamp: new Date().toISOString(),
      heatmap,
      metadata: {
        model: 'Gaussian Plume Probabilistic v2',
        confidence: 0.88,
        cityParams: cityData
      }
    });
  });

  // 2. Predict AQI (Time-series prediction)
  app.post('/api/predict-aqi', (req, res) => {
    const { city, traffic, emissions } = req.body;
    const cityData = CITIES_DB[city] || CITIES_DB['New Delhi'];
    
    const baseValue = cityData.baseAqi;
    const predictions = [];
    let current = baseValue;

    // Simulate LSTM-like temporal dependencies
    for (let i = 1; i <= 24; i++) {
      const trafficFactor = (traffic || cityData.trafficDensity) * (Math.sin((i - 8) * Math.PI / 12) + 1); // Peak at 8 AM/PM
      const emissionsFactor = (emissions || cityData.industrialEmissions) / 100;
      
      const trend = (trafficFactor * 20) + (emissionsFactor * 10);
      const noise = (Math.random() - 0.5) * 5;
      
      current = Math.max(20, baseValue + trend + noise);
      predictions.push({
        hour: i,
        value: Math.round(current),
        label: `${i}:00`
      });
    }

    res.json({
      city,
      predictions,
      summary: `Predicted AQI trend for ${city} based on current traffic (${traffic || cityData.trafficDensity}) and industrial output.`
    });
  });

  // 3. Intervention Impact Analysis
  app.post('/api/intervention-impact', (req, res) => {
    const { interventionType, currentAqi } = req.body;
    
    const impacts: Record<string, number> = {
      'green-belt': 0.15, // 15% reduction
      'traffic-reduction': 0.25,
      'industrial-filter': 0.30,
      'pedestrian-zone': 0.10
    };

    const reductionFactor = impacts[interventionType] || 0.05;
    const projectedAqi = currentAqi * (1 - reductionFactor);

    res.json({
      intervention: interventionType,
      originalAqi: currentAqi,
      projectedAqi: Math.round(projectedAqi),
      reductionPercentage: reductionFactor * 100,
      timeToImpact: "3-6 months"
    });
  });

  // --- Vite Integration ---

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AeronicX Digital Twin Engine running on http://localhost:${PORT}`);
  });
}

startServer();
