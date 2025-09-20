// KSEB Electric Fence Monitoring System with Google Maps Integration
class KSEBMonitoringSystem {
    constructor() {
        // Fence data with Google Maps coordinates
        this.fenceData = [
            {
                id: "KSEB001",
                name: "Thiruvananthapuram Central",
                location: "TVM District Office",
                current: 11.2,
                voltage: 8.5,
                status: "normal",
                dailyPeak: 12.1,
                owner: "District Collector Office",
                contact: "91-471-2345678",
                coordinates: {
                    lat: 8.5241,
                    lng: 76.9366,
                    address: "District Collector Office, Thiruvananthapuram, Kerala, India"
                }
            },
            {
                id: "KSEB002",
                name: "Kochi Industrial Zone",
                location: "Kakkanad IT Park",
                current: 14.7,
                voltage: 8.3,
                status: "critical",
                dailyPeak: 15.2,
                owner: "IT Park Authority",
                contact: "91-484-2345678",
                coordinates: {
                    lat: 10.0261,
                    lng: 76.3475,
                    address: "Kakkanad IT Park, Kochi, Kerala, India"
                }
            },
            {
                id: "KSEB003",
                name: "Kozhikode Beach Road",
                location: "Beach Road Substation",
                current: 9.8,
                voltage: 8.7,
                status: "normal",
                dailyPeak: 11.3,
                owner: "Tourism Department",
                contact: "91-495-2345678",
                coordinates: {
                    lat: 11.2588,
                    lng: 75.7804,
                    address: "Beach Road, Kozhikode, Kerala, India"
                }
            },
            {
                id: "KSEB004",
                name: "Thrissur Cultural Center",
                location: "Swaraj Round",
                current: 12.9,
                voltage: 8.4,
                status: "warning",
                dailyPeak: 13.4,
                owner: "Cultural Affairs Dept",
                contact: "91-487-2345678",
                coordinates: {
                    lat: 10.5276,
                    lng: 76.2144,
                    address: "Swaraj Round, Thrissur, Kerala, India"
                }
            },
            {
                id: "KSEB005",
                name: "Kollam Port Authority",
                location: "Kollam Port Complex",
                current: 10.5,
                voltage: 8.6,
                status: "normal",
                dailyPeak: 11.8,
                owner: "Port Trust",
                contact: "91-474-2345678",
                coordinates: {
                    lat: 8.8932,
                    lng: 76.6141,
                    address: "Kollam Port, Kollam, Kerala, India"
                }
            },
            {
                id: "KSEB006",
                name: "Palakkad Railway Junction",
                location: "Railway Station Perimeter",
                current: 13.2,
                voltage: 8.2,
                status: "warning",
                dailyPeak: 13.8,
                owner: "Indian Railways",
                contact: "91-491-2345678",
                coordinates: {
                    lat: 10.7760,
                    lng: 76.6547,
                    address: "Palakkad Railway Station, Palakkad, Kerala, India"
                }
            },
            {
                id: "KSEB007",
                name: "Malappuram Govt Complex",
                location: "District Collectorate",
                current: 8.7,
                voltage: 8.8,
                status: "normal",
                dailyPeak: 10.2,
                owner: "District Administration",
                contact: "91-483-2345678",
                coordinates: {
                    lat: 11.0510,
                    lng: 76.0711,
                    address: "District Collectorate, Malappuram, Kerala, India"
                }
            },
            {
                id: "KSEB008",
                name: "Kannur Airport Perimeter",
                location: "International Airport",
                current: 11.8,
                voltage: 8.4,
                status: "normal",
                dailyPeak: 12.5,
                owner: "Airport Authority",
                contact: "91-497-2345678",
                coordinates: {
                    lat: 11.9538,
                    lng: 75.5258,
                    address: "Kannur International Airport, Kannur, Kerala, India"
                }
            },
            {
                id: "KSEB009",
                name: "Wayanad Tourist Center",
                location: "Vythiri Resort Area",
                current: 7.9,
                voltage: 8.9,
                status: "normal",
                dailyPeak: 9.1,
                owner: "Forest Department",
                contact: "91-493-2345678",
                coordinates: {
                    lat: 11.5102,
                    lng: 76.0142,
                    address: "Vythiri, Wayanad, Kerala, India"
                }
            },
            {
                id: "KSEB010",
                name: "Idukki Dam Security",
                location: "Dam Perimeter Fence",
                current: 12.4,
                voltage: 8.3,
                status: "normal",
                dailyPeak: 13.1,
                owner: "Dam Authority",
                contact: "91-486-2345678",
                coordinates: {
                    lat: 9.8502,
                    lng: 76.9710,
                    address: "Idukki Dam, Idukki, Kerala, India"
                }
            }
        ];

        this.alertThreshold = 13.0;
        this.warningThreshold = 11.0;
        this.currentPage = window.location.pathname.includes('fence-details') ? 'details' : 'dashboard';
        
        this.init();
    }

    init() {
        if (this.currentPage === 'dashboard') {
            this.initDashboard();
        } else {
            this.initDetailsPage();
        }
        
        // Initialize chatbot
        this.initChatbot();
        
        // Start real-time updates
        this.startRealTimeUpdates();
    }

    initDashboard() {
        this.renderFenceGrid();
        this.updateStatistics();
        this.showAlertBanner();
    }

    initDetailsPage() {
        this.loadSelectedFenceDetails();
        this.drawChart();
    }

    // Function to open Google Maps
    openGoogleMaps(coordinates, address) {
        const { lat, lng } = coordinates;
        // Create Google Maps URL with coordinates and address
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(address)}`;
        // Open in new tab/window
        window.open(mapsUrl, '_blank');
    }

    renderFenceGrid() {
        const fenceGrid = document.getElementById('fenceGrid');
        if (!fenceGrid) return;

        fenceGrid.innerHTML = this.fenceData.map(fence => `
            <div class="fence-card ${fence.status}" onclick="openFenceDetails('${fence.id}')">
                <div class="fence-header">
                    <div>
                        <h3 class="fence-name">${fence.name}</h3>
                        <p class="fence-location">
                            <span class="location-text" onclick="event.stopPropagation(); openGoogleMaps('${fence.id}')" title="Click to view on Google Maps">
                                📍 ${fence.location}
                            </span>
                        </p>
                    </div>
                    <span class="status-indicator ${fence.status}">
                        ${fence.status.toUpperCase()}
                    </span>
                </div>
                <div class="fence-metrics">
                    <div class="metric">
                        <div class="metric-label">Current</div>
                        <div class="metric-value ${fence.status}">${fence.current}A</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Voltage</div>
                        <div class="metric-value">${fence.voltage}V</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Owner</div>
                        <div class="metric-value" style="font-size: 12px;">${fence.owner}</div>
                    </div>
                    <div class="metric">
                        <div class="metric-label">Daily Peak</div>
                        <div class="metric-value">${fence.dailyPeak}A</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateStatistics() {
        const normal = this.fenceData.filter(f => f.status === 'normal').length;
        const warning = this.fenceData.filter(f => f.status === 'warning').length;
        const critical = this.fenceData.filter(f => f.status === 'critical').length;

        this.updateElement('totalFences', this.fenceData.length);
        this.updateElement('normalCount', normal);
        this.updateElement('warningCount', warning);
        this.updateElement('criticalCount', critical);
    }

    showAlertBanner() {
        const criticalFences = this.fenceData.filter(f => f.status === 'critical');
        const alertBanner = document.getElementById('alertBanner');
        
        if (criticalFences.length > 0 && alertBanner) {
            alertBanner.style.display = 'block';
        }
    }

    loadSelectedFenceDetails() {
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const fence = this.fenceData.find(f => f.id === selectedFenceId);
        
        if (!fence) return;

        // Store fence data for details page
        localStorage.setItem('selectedFenceData', JSON.stringify(fence));
    }

    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate real-time data changes
            this.fenceData.forEach(fence => {
                const variation = (Math.random() - 0.5) * 0.2;
                fence.current = Math.max(0, fence.current + variation);
                fence.voltage = Math.max(0, Math.min(10, fence.voltage + (Math.random() - 0.5) * 0.1));
                
                // Update status based on current
                if (fence.current > this.alertThreshold) {
                    fence.status = 'critical';
                } else if (fence.current > this.warningThreshold) {
                    fence.status = 'warning';
                } else {
                    fence.status = 'normal';
                }
            });

            if (this.currentPage === 'dashboard') {
                this.renderFenceGrid();
                this.updateStatistics();
            }
        }, 5000);
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Chatbot functionality
    initChatbot() {
        this.chatbot = new KSEBChatbot();
    }

    // Get fence data by ID
    getFenceById(id) {
        return this.fenceData.find(f => f.id === id);
    }
}

// KSEB Enhanced Monitoring System for Details Page
class KSEBDetailedMonitoringSystem {
    constructor() {
        this.historyData = [];
        this.isHistoryVisible = false;
        this.currentFence = null;
        this.init();
        this.generateSampleHistory();
    }

    init() {
        this.loadSelectedFenceDetails();
        this.drawChart();
        this.initChatbot();
        this.startRealTimeUpdates();
    }

    // EXACT SOUND IMPLEMENTATION FROM ORIGINAL FILE
    playAlertSound() {
        // Create simple alert beep
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 1);
        } catch (error) {
            console.log('Audio not available');
        }
    }

    loadSelectedFenceDetails() {
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const fenceData = this.getFenceData();
        const fence = fenceData.find(f => f.id === selectedFenceId);
        
        if (!fence) return;

        this.currentFence = fence;

        // Update all details page elements
        this.updateElement('fenceName', fence.name);
        this.updateElement('fenceId', fence.id);
        this.updateElement('locationText', fence.location);
        this.updateElement('fenceOwner', fence.owner);
        this.updateElement('fenceContact', fence.contact);
        this.updateElement('currentReading', `${fence.current}A`);
        this.updateElement('voltageReading', `${fence.voltage}V`);
        this.updateElement('dailyPeak', `${fence.dailyPeak}A`);
        this.updateElement('lastUpdated', 'Now');

        // Update location information
        if (fence.coordinates) {
            this.updateElement('coordinates', `${fence.coordinates.lat}, ${fence.coordinates.lng}`);
            this.updateElement('fullAddress', fence.coordinates.address);
        }

        // Update status card and trigger sound alert
        const statusCard = document.getElementById('statusCard');
        const statusBadge = document.getElementById('statusBadge');
        const alertMessage = document.getElementById('alertMessage');

        if (statusCard && statusBadge && alertMessage) {
            statusCard.className = `status-card ${fence.status}`;
            statusBadge.textContent = fence.status.toUpperCase();
            
            if (fence.status === 'critical') {
                alertMessage.textContent = `Current exceeds 13A safety threshold!`;
                // Play alert sound - EXACTLY like the original
                this.playAlertSound();
            } else if (fence.status === 'warning') {
                alertMessage.textContent = `Current approaching safety threshold (${fence.current}A/13A)`;
            } else {
                alertMessage.textContent = 'Electric fence operating within safe parameters';
            }
        }

        // Update trends
        this.updateElement('currentTrend', this.calculateTrend(fence.current, fence.dailyPeak));
        this.updateElement('voltageTrend', '→ Stable');
        this.updateElement('peakTime', 'at 14:23 IST');
    }

    getFenceData() {
        return [
            {
                id: "KSEB001", name: "Thiruvananthapuram Central", location: "TVM District Office",
                current: 11.2, voltage: 8.5, status: "normal", dailyPeak: 12.1,
                owner: "District Collector Office", contact: "91-471-2345678",
                coordinates: { lat: 8.5241, lng: 76.9366, address: "District Collector Office, Thiruvananthapuram, Kerala, India" }
            },
            {
                id: "KSEB002", name: "Kochi Industrial Zone", location: "Kakkanad IT Park",
                current: 14.7, voltage: 8.3, status: "critical", dailyPeak: 15.2,
                owner: "IT Park Authority", contact: "91-484-2345678",
                coordinates: { lat: 10.0261, lng: 76.3475, address: "Kakkanad IT Park, Kochi, Kerala, India" }
            },
            {
                id: "KSEB003", name: "Kozhikode Beach Road", location: "Beach Road Substation",
                current: 9.8, voltage: 8.7, status: "normal", dailyPeak: 11.3,
                owner: "Tourism Department", contact: "91-495-2345678",
                coordinates: { lat: 11.2588, lng: 75.7804, address: "Beach Road, Kozhikode, Kerala, India" }
            },
            {
                id: "KSEB004", name: "Thrissur Cultural Center", location: "Swaraj Round",
                current: 12.9, voltage: 8.4, status: "warning", dailyPeak: 13.4,
                owner: "Cultural Affairs Dept", contact: "91-487-2345678",
                coordinates: { lat: 10.5276, lng: 76.2144, address: "Swaraj Round, Thrissur, Kerala, India" }
            },
            {
                id: "KSEB005", name: "Kollam Port Authority", location: "Kollam Port Complex",
                current: 10.5, voltage: 8.6, status: "normal", dailyPeak: 11.8,
                owner: "Port Trust", contact: "91-474-2345678",
                coordinates: { lat: 8.8932, lng: 76.6141, address: "Kollam Port, Kollam, Kerala, India" }
            },
            {
                id: "KSEB006", name: "Palakkad Railway Junction", location: "Railway Station Perimeter",
                current: 13.2, voltage: 8.2, status: "warning", dailyPeak: 13.8,
                owner: "Indian Railways", contact: "91-491-2345678",
                coordinates: { lat: 10.7760, lng: 76.6547, address: "Palakkad Railway Station, Palakkad, Kerala, India" }
            },
            {
                id: "KSEB007", name: "Malappuram Govt Complex", location: "District Collectorate",
                current: 8.7, voltage: 8.8, status: "normal", dailyPeak: 10.2,
                owner: "District Administration", contact: "91-483-2345678",
                coordinates: { lat: 11.0510, lng: 76.0711, address: "District Collectorate, Malappuram, Kerala, India" }
            },
            {
                id: "KSEB008", name: "Kannur Airport Perimeter", location: "International Airport",
                current: 11.8, voltage: 8.4, status: "normal", dailyPeak: 12.5,
                owner: "Airport Authority", contact: "91-497-2345678",
                coordinates: { lat: 11.9538, lng: 75.5258, address: "Kannur International Airport, Kannur, Kerala, India" }
            },
            {
                id: "KSEB009", name: "Wayanad Tourist Center", location: "Vythiri Resort Area",
                current: 7.9, voltage: 8.9, status: "normal", dailyPeak: 9.1,
                owner: "Forest Department", contact: "91-493-2345678",
                coordinates: { lat: 11.5102, lng: 76.0142, address: "Vythiri, Wayanad, Kerala, India" }
            },
            {
                id: "KSEB010", name: "Idukki Dam Security", location: "Dam Perimeter Fence",
                current: 12.4, voltage: 8.3, status: "normal", dailyPeak: 13.1,
                owner: "Dam Authority", contact: "91-486-2345678",
                coordinates: { lat: 9.8502, lng: 76.9710, address: "Idukki Dam, Idukki, Kerala, India" }
            }
        ];
    }

    generateSampleHistory() {
        const now = new Date();
        this.historyData = [];
        
        // Generate 24 hours of sample data
        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
            const baseCurrent = 12 + Math.sin(i * 0.5) * 3;
            const current = (baseCurrent + (Math.random() - 0.5) * 2).toFixed(1);
            const voltage = (8.5 + (Math.random() - 0.5) * 0.5).toFixed(1);
            const status = current > 13 ? 'critical' : current > 11 ? 'warning' : 'normal';
            
            this.historyData.push({
                time: time.toLocaleString(),
                current: parseFloat(current),
                voltage: parseFloat(voltage),
                status: status
            });
        }
    }

    calculateTrend(current, peak) {
        const diff = (current - (peak * 0.8)).toFixed(1);
        if (diff > 0) {
            return `↑ +${diff}A from average`;
        } else if (diff < 0) {
            return `↓ ${diff}A from average`;
        } else {
            return '→ At average level';
        }
    }

    drawChart() {
        const canvas = document.getElementById('currentChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        // Generate data points
        const dataPoints = [];
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const baseCurrent = this.getFenceData().find(f => f.id === selectedFenceId)?.current || 14.7;
        
        for (let i = 0; i < 50; i++) {
            const variation = (Math.random() - 0.5) * 2;
            dataPoints.push(baseCurrent + variation);
        }

        // Draw grid
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = 1;
        
        for (let i = 0; i <= 10; i++) {
            const y = (height / 10) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        for (let i = 0; i <= 10; i++) {
            const x = (width / 10) * i;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        // Draw threshold line
        const thresholdY = height - (13 / 20) * height;
        ctx.strokeStyle = '#dc3545';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, thresholdY);
        ctx.lineTo(width, thresholdY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw data line
        ctx.strokeStyle = '#003f7f';
        ctx.lineWidth = 3;
        ctx.beginPath();

        dataPoints.forEach((point, index) => {
            const x = (width / (dataPoints.length - 1)) * index;
            const y = height - (point / 20) * height;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw current point
        const currentX = width - (width / (dataPoints.length - 1));
        const currentY = height - (baseCurrent / 20) * height;
        ctx.fillStyle = baseCurrent > 13 ? '#dc3545' : '#003f7f';
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, 2 * Math.PI);
        ctx.fill();
    }

    updateElement(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    startRealTimeUpdates() {
        setInterval(() => {
            // Simulate real-time data changes
            if (this.currentFence) {
                const variation = (Math.random() - 0.5) * 0.2;
                this.currentFence.current = Math.max(0, this.currentFence.current + variation);
                this.currentFence.voltage = Math.max(0, Math.min(10, this.currentFence.voltage + (Math.random() - 0.5) * 0.1));
                
                // Update status based on current
                if (this.currentFence.current > 13) {
                    this.currentFence.status = 'critical';
                } else if (this.currentFence.current > 11) {
                    this.currentFence.status = 'warning';
                } else {
                    this.currentFence.status = 'normal';
                }
            }
            
            this.loadSelectedFenceDetails();
            this.drawChart();
        }, 5000);
    }

    initChatbot() {
        // Chatbot initialization
    }
}

// Global functions
function openFenceDetails(fenceId) {
    localStorage.setItem('selectedFenceId', fenceId);
    window.location.href = 'fence-details.html';
}

function openGoogleMaps(fenceId) {
    const fence = monitoringSystem.getFenceById(fenceId);
    if (fence && fence.coordinates) {
        monitoringSystem.openGoogleMaps(fence.coordinates, fence.coordinates.address);
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function refreshData() {
    window.location.reload();
}

function closeAlert() {
    const alertBanner = document.getElementById('alertBanner');
    if (alertBanner) {
        alertBanner.style.display = 'none';
    }
}

function openLocationOnMap() {
    if (monitoringSystem.currentFence && monitoringSystem.currentFence.coordinates) {
        const { lat, lng, address } = monitoringSystem.currentFence.coordinates;
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
    }
}

function getDirections() {
    if (monitoringSystem.currentFence && monitoringSystem.currentFence.coordinates) {
        const { lat, lng } = monitoringSystem.currentFence.coordinates;
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(directionsUrl, '_blank');
    }
}

function downloadReport() {
    let fence;
    if (window.monitoringSystem && window.monitoringSystem.currentFence) {
        fence = window.monitoringSystem.currentFence;
    } else {
        const selectedFenceId = localStorage.getItem('selectedFenceId') || 'KSEB002';
        const fenceData = [
            {
                id: "KSEB001", name: "Thiruvananthapuram Central", location: "TVM District Office",
                current: 11.2, voltage: 8.5, status: "normal", dailyPeak: 12.1,
                owner: "District Collector Office", contact: "91-471-2345678",
                coordinates: { lat: 8.5241, lng: 76.9366, address: "District Collector Office, Thiruvananthapuram, Kerala, India" }
            },
            {
                id: "KSEB002", name: "Kochi Industrial Zone", location: "Kakkanad IT Park",
                current: 14.7, voltage: 8.3, status: "critical", dailyPeak: 15.2,
                owner: "IT Park Authority", contact: "91-484-2345678",
                coordinates: { lat: 10.0261, lng: 76.3475, address: "Kakkanad IT Park, Kochi, Kerala, India" }
            }
        ];
        fence = fenceData.find(f => f.id === selectedFenceId) || fenceData[0];
    }
    
    const reportContent = `
KSEB Electric Fence Monitoring Report
Generated: ${new Date().toLocaleString()}

Fence Details:
- ID: ${fence.id}
- Name: ${fence.name}
- Location: ${fence.location}
- Owner: ${fence.owner}
- Contact: ${fence.contact}
- Coordinates: ${fence.coordinates ? fence.coordinates.lat + ', ' + fence.coordinates.lng : 'N/A'}
- Address: ${fence.coordinates ? fence.coordinates.address : 'N/A'}

Current Status:
- Current Reading: ${fence.current}A
- Voltage Level: ${fence.voltage}V
- Status: ${fence.status.toUpperCase()}
- Daily Peak: ${fence.dailyPeak}A

Safety Information:
- Normal Range: 0-11 Amperes
- Warning Range: 11-13 Amperes
- Critical Range: Above 13 Amperes
- Emergency Contact: KSEB Control Room: 1912
- Google Maps: Click location to view exact position
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KSEB_Fence_Report_${fence.id}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function exportData() {
    let historyData = [];
    if (window.monitoringSystem && window.monitoringSystem.historyData) {
        historyData = window.monitoringSystem.historyData;
    } else {
        // Generate sample data if not available
        const now = new Date();
        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
            const baseCurrent = 12 + Math.sin(i * 0.5) * 3;
            const current = (baseCurrent + (Math.random() - 0.5) * 2).toFixed(1);
            const voltage = (8.5 + (Math.random() - 0.5) * 0.5).toFixed(1);
            const status = current > 13 ? 'critical' : current > 11 ? 'warning' : 'normal';
            
            historyData.push({
                time: time.toLocaleString(),
                current: parseFloat(current),
                voltage: parseFloat(voltage),
                status: status
            });
        }
    }

    const csvContent = historyData.map(row => 
        `${row.time},${row.current},${row.voltage},${row.status}`
    ).join('\n');

    const header = 'Time,Current (A),Voltage (V),Status\n';
    const fullCsv = header + csvContent;

    const blob = new Blob([fullCsv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KSEB_Fence_Data_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    alert('Fence data exported successfully!');
}

function toggleHistory() {
    const historyContainer = document.getElementById('historyContainer');
    const button = event.target;
    
    let isHistoryVisible = false;
    if (window.monitoringSystem) {
        isHistoryVisible = window.monitoringSystem.isHistoryVisible;
    }
    
    if (isHistoryVisible) {
        historyContainer.style.display = 'none';
        button.innerHTML = '📊 View History';
        if (window.monitoringSystem) {
            window.monitoringSystem.isHistoryVisible = false;
        }
    } else {
        historyContainer.style.display = 'block';
        button.innerHTML = '📊 Hide History';
        if (window.monitoringSystem) {
            window.monitoringSystem.isHistoryVisible = true;
        }
        loadHistoryTable();
    }
}

function loadHistoryTable() {
    const tbody = document.getElementById('historyTableBody');
    let historyData = [];
    
    if (window.monitoringSystem && window.monitoringSystem.historyData) {
        historyData = window.monitoringSystem.historyData;
    } else {
        // Generate sample data if not available
        const now = new Date();
        for (let i = 0; i < 24; i++) {
            const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
            const baseCurrent = 12 + Math.sin(i * 0.5) * 3;
            const current = (baseCurrent + (Math.random() - 0.5) * 2).toFixed(1);
            const voltage = (8.5 + (Math.random() - 0.5) * 0.5).toFixed(1);
            const status = current > 13 ? 'critical' : current > 11 ? 'warning' : 'normal';
            
            historyData.push({
                time: time.toLocaleString(),
                current: parseFloat(current),
                voltage: parseFloat(voltage),
                status: status
            });
        }
    }
    
    tbody.innerHTML = historyData.map(row => `
        <tr class="status-${row.status}">
            <td>${row.time}</td>
            <td>${row.current}A</td>
            <td>${row.voltage}V</td>
            <td><span class="status-badge ${row.status}">${row.status.toUpperCase()}</span></td>
        </tr>
    `).join('');
}

function filterHistory() {
    loadHistoryTable();
}

function reportEmergency() {
    alert('Emergency reported to KSEB Control Room!\nEmergency Hotline: 1912');
}

// AI Chatbot Class
class KSEBChatbot {
    constructor() {
        this.isOpen = false;
        this.isMinimized = false;
        this.responses = {
            greeting: "Hello! I'm the KSEB AI Assistant. I can help you understand fence readings, explain alerts, and guide you through our monitoring system. How can I assist you today?",
            location: "You can now click on any fence location (📍) to view it on Google Maps! This helps you navigate to the exact fence location for maintenance or inspection.",
            maps: "Our new Google Maps integration shows the precise location of each fence. Simply click the location name with the 📍 icon to open Google Maps.",
            currentReading: "Current readings show the electrical flow through each fence in Amperes (A). Normal range is 0-11A, Warning is 11-13A, and Critical is above 13A which triggers emergency protocols.",
            criticalAlert: "Critical alerts occur when current exceeds 13A, indicating potential safety hazards. Emergency notifications are automatically sent to KSEB officials and fence owners for immediate action.",
            default: "I understand you're asking about our fence monitoring system. Could you be more specific? I can help with current readings, alerts, safety thresholds, dashboard navigation, or the new Google Maps location feature."
        };
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const chatBubble = document.getElementById('chatBubble');
        const closeBtn = document.getElementById('closeBtn');
        const minimizeBtn = document.getElementById('minimizeBtn');
        const sendBtn = document.getElementById('sendBtn');
        const chatInput = document.getElementById('chatInput');

        if (chatBubble) chatBubble.addEventListener('click', () => this.toggleChat());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeChat());
        if (minimizeBtn) minimizeBtn.addEventListener('click', () => this.minimizeChat());
        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatBubble = document.getElementById('chatBubble');
        
        if (!this.isOpen) {
            if (chatWindow) chatWindow.classList.add('active');
            if (chatBubble) chatBubble.style.display = 'none';
            this.isOpen = true;
        } else {
            this.closeChat();
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        const chatBubble = document.getElementById('chatBubble');
        
        if (chatWindow) chatWindow.classList.remove('active');
        if (chatBubble) chatBubble.style.display = 'flex';
        this.isOpen = false;
        this.isMinimized = false;
    }

    minimizeChat() {
        this.isMinimized = !this.isMinimized;
        const chatWindow = document.getElementById('chatWindow');
        
        if (chatWindow) {
            if (this.isMinimized) {
                chatWindow.style.height = '80px';
            } else {
                chatWindow.style.height = '500px';
            }
        }
    }

    async sendMessage() {
        const chatInput = document.getElementById('chatInput');
        if (!chatInput) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        chatInput.value = '';
        
        this.showTypingIndicator();
        
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1500);
    }

    addMessage(content, sender) {
        const chatMessages = document.getElementById('chatMessages');
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">${content}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.add('active');
        }
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.classList.remove('active');
        }
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('location') || lowerMessage.includes('map') || lowerMessage.includes('where')) {
            return this.responses.location;
        } else if (lowerMessage.includes('google') || lowerMessage.includes('navigate')) {
            return this.responses.maps;
        } else if (lowerMessage.includes('current') || lowerMessage.includes('reading')) {
            return this.responses.currentReading;
        } else if (lowerMessage.includes('critical') || lowerMessage.includes('alert')) {
            return this.responses.criticalAlert;
        } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.responses.greeting;
        } else {
            return this.responses.default;
        }
    }
}

// Initialize the system when DOM is loaded
let monitoringSystem;
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('fence-details')) {
        monitoringSystem = new KSEBDetailedMonitoringSystem();
    } else {
        monitoringSystem = new KSEBMonitoringSystem();
    }
});