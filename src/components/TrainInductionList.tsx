import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { 
  Train, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Shield,
  Wrench,
  Star,
  TrendingUp,
  Calendar,
  Fuel,
  Zap,
  Award,
  Target,
  Info,
  Download,
  FileText,
  FileSpreadsheet,
  FileType
} from 'lucide-react';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType } from 'docx';
import * as XLSX from 'xlsx';

interface TrainInductionData {
  trainset: string;
  rank: number;
  readinessScore: number;
  status: 'Ready' | 'Conditional' | 'Not Ready' | 'Maintenance Required';
  fitnessCert: {
    status: 'Valid' | 'Expiring' | 'Expired';
    daysLeft: number;
    score: number;
  };
  maintenance: {
    status: 'Complete' | 'Due' | 'Overdue';
    lastService: string;
    score: number;
  };
  mileage: {
    total: number;
    weeklyAvg: number;
    balance: 'Low' | 'Optimal' | 'High';
    score: number;
  };
  branding: {
    hasContract: boolean;
    value?: string;
    daysLeft?: number;
    score: number;
  };
  cleaning: {
    status: 'Fresh' | 'Due' | 'Overdue';
    lastCleaned: string;
    score: number;
  };
  yesterday: {
    punctuality: number;
    issues: number;
    performance: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    score: number;
  };
  reasoning: string[];
  blockers: string[];
  recommendation: string;
}

const inductionData: TrainInductionData[] = [
  {
    trainset: 'T-007',
    rank: 1,
    readinessScore: 98,
    status: 'Ready',
    fitnessCert: { status: 'Valid', daysLeft: 45, score: 100 },
    maintenance: { status: 'Complete', lastService: '2024-01-28', score: 100 },
    mileage: { total: 71250, weeklyAvg: 2100, balance: 'Optimal', score: 95 },
    branding: { hasContract: true, value: '₹35,00,000', daysLeft: 225, score: 100 },
    cleaning: { status: 'Fresh', lastCleaned: '2024-02-01', score: 100 },
    yesterday: { punctuality: 100, issues: 0, performance: 'Excellent', score: 100 },
    reasoning: [
      'Perfect fitness certificate validity (45 days remaining)',
      'Recent maintenance completed successfully',
      'Optimal mileage balance for sustained operation',
      'High-value active branding contract ensuring revenue',
      'Freshly cleaned and inspected',
      'Flawless performance yesterday with 100% punctuality'
    ],
    blockers: [],
    recommendation: 'Priority deployment for peak morning service - highest reliability expected'
  },
  {
    trainset: 'T-014',
    rank: 2,
    readinessScore: 94,
    status: 'Ready',
    fitnessCert: { status: 'Valid', daysLeft: 22, score: 85 },
    maintenance: { status: 'Complete', lastService: '2024-01-25', score: 95 },
    mileage: { total: 68945, weeklyAvg: 2350, balance: 'Optimal', score: 90 },
    branding: { hasContract: true, value: '₹28,00,000', daysLeft: 180, score: 95 },
    cleaning: { status: 'Fresh', lastCleaned: '2024-01-31', score: 95 },
    yesterday: { punctuality: 98.5, issues: 0, performance: 'Excellent', score: 95 },
    reasoning: [
      'Valid fitness certificate with 22 days buffer',
      'Maintenance up-to-date and systems verified',
      'Well-balanced mileage distribution',
      'Active branding contract with good revenue potential',
      'Recently cleaned with all systems checked',
      'Strong performance record from previous day'
    ],
    blockers: [],
    recommendation: 'Excellent choice for morning rush hours - consistent performer'
  },
  {
    trainset: 'T-021',
    rank: 3,
    readinessScore: 91,
    status: 'Ready',
    fitnessCert: { status: 'Valid', daysLeft: 38, score: 95 },
    maintenance: { status: 'Complete', lastService: '2024-01-30', score: 100 },
    mileage: { total: 73820, weeklyAvg: 2800, balance: 'High', score: 75 },
    branding: { hasContract: false, score: 60 },
    cleaning: { status: 'Fresh', lastCleaned: '2024-02-01', score: 100 },
    yesterday: { punctuality: 99.2, issues: 1, performance: 'Good', score: 85 },
    reasoning: [
      'Solid fitness certificate validity',
      'Recently completed maintenance cycle',
      'Higher mileage but within acceptable limits',
      'No revenue-generating branding currently',
      'Pristine cleaning status',
      'Minor service hiccup yesterday but overall good performance'
    ],
    blockers: [],
    recommendation: 'Deploy for regular service - monitor mileage accumulation'
  },
  {
    trainset: 'T-003',
    rank: 4,
    readinessScore: 82,
    status: 'Conditional',
    fitnessCert: { status: 'Valid', daysLeft: 15, score: 75 },
    maintenance: { status: 'Due', lastService: '2024-01-15', score: 70 },
    mileage: { total: 89245, weeklyAvg: 3200, balance: 'High', score: 45 },
    branding: { hasContract: true, value: '₹25,00,000', daysLeft: 90, score: 80 },
    cleaning: { status: 'Due', lastCleaned: '2024-01-28', score: 70 },
    yesterday: { punctuality: 96.8, issues: 2, performance: 'Fair', score: 70 },
    reasoning: [
      'Fitness certificate valid but requires renewal planning',
      'Maintenance scheduled due - should be completed soon',
      'High mileage requiring rotation consideration',
      'Active branding contract with moderate revenue',
      'Cleaning due but not critical',
      'Performance issues noted yesterday requiring attention'
    ],
    blockers: [
      'Schedule maintenance completion before heavy deployment',
      'Monitor high mileage impact on components'
    ],
    recommendation: 'Use for limited service only - prioritize maintenance completion'
  },
  {
    trainset: 'T-012',
    rank: 5,
    readinessScore: 65,
    status: 'Conditional',
    fitnessCert: { status: 'Expiring', daysLeft: 3, score: 30 },
    maintenance: { status: 'Complete', lastService: '2024-01-26', score: 90 },
    mileage: { total: 82156, weeklyAvg: 2950, balance: 'High', score: 55 },
    branding: { hasContract: true, value: '₹40,00,000', daysLeft: 120, score: 90 },
    cleaning: { status: 'Fresh', lastCleaned: '2024-02-01', score: 100 },
    yesterday: { punctuality: 94.2, issues: 3, performance: 'Fair', score: 65 },
    reasoning: [
      'Critical: Fitness certificate expires in 3 days',
      'Maintenance recently completed and verified',
      'High mileage accumulation needs attention',
      'Valuable branding contract must be protected',
      'Excellent cleaning and preparation status',
      'Multiple service issues affected performance yesterday'
    ],
    blockers: [
      'URGENT: Fitness certificate renewal required within 3 days',
      'Service quality monitoring needed due to recent issues'
    ],
    recommendation: 'Emergency use only - immediate fitness renewal required'
  },
  {
    trainset: 'T-018',
    rank: 6,
    readinessScore: 45,
    status: 'Not Ready',
    fitnessCert: { status: 'Valid', daysLeft: 25, score: 85 },
    maintenance: { status: 'Overdue', lastService: '2024-01-10', score: 25 },
    mileage: { total: 76543, weeklyAvg: 2650, balance: 'Optimal', score: 85 },
    branding: { hasContract: false, score: 60 },
    cleaning: { status: 'Overdue', lastCleaned: '2024-01-25', score: 40 },
    yesterday: { punctuality: 89.5, issues: 5, performance: 'Poor', score: 30 },
    reasoning: [
      'Valid fitness certificate provides basic authorization',
      'Critical: Maintenance severely overdue (22 days)',
      'Mileage balance acceptable for operation',
      'No current branding obligations',
      'Cleaning standards below acceptable levels',
      'Poor performance with multiple failures yesterday'
    ],
    blockers: [
      'CRITICAL: Complete overdue maintenance immediately',
      'Mandatory deep cleaning required',
      'Investigate and resolve yesterday\'s service failures'
    ],
    recommendation: 'DO NOT DEPLOY - Complete all mandatory activities first'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ready': return 'bg-green-100 text-green-800 border-green-200';
    case 'Conditional': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Not Ready': return 'bg-red-100 text-red-800 border-red-200';
    case 'Maintenance Required': return 'bg-orange-100 text-orange-800 border-orange-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 75) return 'text-blue-600';
  if (score >= 60) return 'text-yellow-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-red-600';
};

const getRankBadge = (rank: number) => {
  if (rank === 1) return { icon: Award, color: 'bg-yellow-100 text-yellow-800', label: '1st' };
  if (rank === 2) return { icon: Award, color: 'bg-gray-100 text-gray-800', label: '2nd' };
  if (rank === 3) return { icon: Award, color: 'bg-orange-100 text-orange-800', label: '3rd' };
  return { icon: Target, color: 'bg-blue-100 text-blue-800', label: `${rank}th` };
};

export function TrainInductionList() {
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  
  const readyTrains = inductionData.filter(train => train.status === 'Ready').length;
  const conditionalTrains = inductionData.filter(train => train.status === 'Conditional').length;
  const notReadyTrains = inductionData.filter(train => train.status === 'Not Ready').length;
  const averageScore = Math.round(inductionData.reduce((sum, train) => sum + train.readinessScore, 0) / inductionData.length);

  // Export to PDF
  const exportToPDF = async () => {
    setIsExporting(true);
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(0, 102, 204);
      pdf.text('Kochi Metro Train Induction List', pageWidth / 2, 20, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(102, 102, 102);
      pdf.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, pageWidth / 2, 30, { align: 'center' });
      
      // Summary
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Fleet Summary:', 20, 50);
      
      pdf.setFontSize(10);
      pdf.text(`Ready for Service: ${readyTrains} trains`, 20, 60);
      pdf.text(`Conditional Use: ${conditionalTrains} trains`, 20, 70);
      pdf.text(`Not Ready: ${notReadyTrains} trains`, 20, 80);
      pdf.text(`Fleet Readiness: ${averageScore}%`, 20, 90);
      
      // Train details
      let yPosition = 110;
      pdf.setFontSize(14);
      pdf.text('Trainset Rankings:', 20, yPosition);
      yPosition += 15;
      
      inductionData.forEach((train, index) => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = 20;
        }
        
        // Train header
        pdf.setFontSize(12);
        pdf.setTextColor(0, 102, 204);
        pdf.text(`${train.rank}. ${train.trainset}`, 20, yPosition);
        pdf.setTextColor(0, 0, 0);
        pdf.text(`Score: ${train.readinessScore}% | Status: ${train.status}`, 100, yPosition);
        yPosition += 10;
        
        // Key metrics
        pdf.setFontSize(9);
        pdf.text(`Fitness: ${train.fitnessCert.score}% | Maintenance: ${train.maintenance.score}% | Mileage: ${train.mileage.score}%`, 25, yPosition);
        yPosition += 8;
        pdf.text(`Branding: ${train.branding.score}% | Cleaning: ${train.cleaning.score}% | Yesterday: ${train.yesterday.score}%`, 25, yPosition);
        yPosition += 10;
        
        // Recommendation
        pdf.setFontSize(8);
        pdf.setTextColor(102, 102, 102);
        const recommendation = pdf.splitTextToSize(train.recommendation, pageWidth - 50);
        pdf.text(recommendation, 25, yPosition);
        yPosition += recommendation.length * 5 + 10;
        
        // Blockers
        if (train.blockers.length > 0) {
          pdf.setTextColor(204, 0, 0);
          pdf.text('Critical Blockers:', 25, yPosition);
          yPosition += 6;
          train.blockers.forEach(blocker => {
            const blockerText = pdf.splitTextToSize(`• ${blocker}`, pageWidth - 60);
            pdf.text(blockerText, 30, yPosition);
            yPosition += blockerText.length * 4 + 3;
          });
          yPosition += 5;
        }
        
        pdf.setTextColor(0, 0, 0);
        yPosition += 5;
      });
      
      pdf.save(`Kochi_Metro_Induction_List_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('PDF export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Export to Word
  const exportToWord = async () => {
    setIsExporting(true);
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Kochi Metro Train Induction List",
                  bold: true,
                  size: 32,
                  color: "0066CC"
                })
              ],
              alignment: "center",
              spacing: { after: 400 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated on: ${new Date().toLocaleDateString('en-IN')}`,
                  italics: true,
                  size: 20
                })
              ],
              alignment: "center",
              spacing: { after: 600 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Fleet Summary",
                  bold: true,
                  size: 24
                })
              ],
              spacing: { after: 200 }
            }),
            new Paragraph({
              children: [
                new TextRun(`Ready for Service: ${readyTrains} trains\n`),
                new TextRun(`Conditional Use: ${conditionalTrains} trains\n`),
                new TextRun(`Not Ready: ${notReadyTrains} trains\n`),
                new TextRun(`Fleet Readiness: ${averageScore}%`)
              ],
              spacing: { after: 600 }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Trainset Rankings",
                  bold: true,
                  size: 24
                })
              ],
              spacing: { after: 300 }
            }),
            ...inductionData.flatMap(train => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${train.rank}. ${train.trainset}`,
                    bold: true,
                    size: 20,
                    color: "0066CC"
                  }),
                  new TextRun({
                    text: ` | Score: ${train.readinessScore}% | Status: ${train.status}`,
                    size: 16
                  })
                ],
                spacing: { after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun(`Fitness: ${train.fitnessCert.score}% | Maintenance: ${train.maintenance.score}% | Mileage: ${train.mileage.score}% | Branding: ${train.branding.score}% | Cleaning: ${train.cleaning.score}% | Yesterday: ${train.yesterday.score}%`)
                ],
                spacing: { after: 100 }
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Recommendation: ",
                    bold: true
                  }),
                  new TextRun(train.recommendation)
                ],
                spacing: { after: train.blockers.length > 0 ? 100 : 300 }
              }),
              ...(train.blockers.length > 0 ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Critical Blockers:",
                      bold: true,
                      color: "CC0000"
                    })
                  ],
                  spacing: { after: 50 }
                }),
                ...train.blockers.map(blocker => new Paragraph({
                  children: [
                    new TextRun({
                      text: `• ${blocker}`,
                      color: "CC0000"
                    })
                  ],
                  spacing: { after: 50 }
                })),
                new Paragraph({
                  children: [new TextRun("")],
                  spacing: { after: 200 }
                })
              ] : [])
            ])
          ]
        }]
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Kochi_Metro_Induction_List_${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Word export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    setIsExporting(true);
    try {
      // Summary sheet data
      const summaryData = [
        ['Kochi Metro Train Induction List'],
        [`Generated on: ${new Date().toLocaleDateString('en-IN')}`],
        [''],
        ['Fleet Summary'],
        ['Ready for Service', readyTrains],
        ['Conditional Use', conditionalTrains],
        ['Not Ready', notReadyTrains],
        ['Fleet Readiness', `${averageScore}%`],
        [''],
        ['Trainset Rankings']
      ];

      // Main data headers
      const headers = [
        'Rank', 'Trainset', 'Readiness Score', 'Status',
        'Fitness Score', 'Fitness Status', 'Fitness Days Left',
        'Maintenance Score', 'Maintenance Status', 'Last Service',
        'Mileage Score', 'Total Mileage', 'Weekly Average', 'Balance',
        'Branding Score', 'Has Contract', 'Contract Value', 'Contract Days Left',
        'Cleaning Score', 'Cleaning Status', 'Last Cleaned',
        'Yesterday Score', 'Punctuality', 'Issues', 'Performance',
        'Recommendation', 'Blockers'
      ];

      // Convert train data to Excel format
      const excelData = inductionData.map(train => [
        train.rank,
        train.trainset,
        train.readinessScore,
        train.status,
        train.fitnessCert.score,
        train.fitnessCert.status,
        train.fitnessCert.daysLeft,
        train.maintenance.score,
        train.maintenance.status,
        train.maintenance.lastService,
        train.mileage.score,
        train.mileage.total,
        train.mileage.weeklyAvg,
        train.mileage.balance,
        train.branding.score,
        train.branding.hasContract ? 'Yes' : 'No',
        train.branding.value || 'N/A',
        train.branding.daysLeft || 'N/A',
        train.cleaning.score,
        train.cleaning.status,
        train.cleaning.lastCleaned,
        train.yesterday.score,
        train.yesterday.punctuality,
        train.yesterday.issues,
        train.yesterday.performance,
        train.recommendation,
        train.blockers.join('; ')
      ]);

      // Create workbook
      const wb = XLSX.utils.book_new();
      
      // Summary sheet
      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
      XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');
      
      // Main data sheet
      const mainData = [headers, ...excelData];
      const mainWs = XLSX.utils.aoa_to_sheet(mainData);
      XLSX.utils.book_append_sheet(wb, mainWs, 'Induction List');
      
      // Detailed metrics sheet
      const detailedHeaders = ['Trainset', 'Metric', 'Value', 'Score'];
      const detailedData = [];
      
      inductionData.forEach(train => {
        detailedData.push([train.trainset, 'Fitness Certificate Status', train.fitnessCert.status, train.fitnessCert.score]);
        detailedData.push([train.trainset, 'Maintenance Status', train.maintenance.status, train.maintenance.score]);
        detailedData.push([train.trainset, 'Mileage Balance', train.mileage.balance, train.mileage.score]);
        detailedData.push([train.trainset, 'Branding Contract', train.branding.hasContract ? 'Active' : 'None', train.branding.score]);
        detailedData.push([train.trainset, 'Cleaning Status', train.cleaning.status, train.cleaning.score]);
        detailedData.push([train.trainset, 'Yesterday Performance', train.yesterday.performance, train.yesterday.score]);
      });
      
      const detailedWs = XLSX.utils.aoa_to_sheet([detailedHeaders, ...detailedData]);
      XLSX.utils.book_append_sheet(wb, detailedWs, 'Detailed Metrics');
      
      // Save file
      XLSX.writeFile(wb, `Kochi_Metro_Induction_List_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error('Excel export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Alert */}
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Next Morning Induction List Generated:</strong> This AI-powered ranking system evaluates all trainsets based on 
          fitness certificates, maintenance status, mileage balance, branding obligations, cleaning status, and yesterday's performance 
          to optimize fleet deployment for maximum reliability and revenue.
        </AlertDescription>
      </Alert>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Ready for Service</p>
                <p className="text-3xl font-bold">{readyTrains}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Conditional Use</p>
                <p className="text-3xl font-bold">{conditionalTrains}</p>
              </div>
              <Clock className="w-10 h-10 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-rose-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Not Ready</p>
                <p className="text-3xl font-bold">{notReadyTrains}</p>
              </div>
              <AlertTriangle className="w-10 h-10 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Fleet Readiness</p>
                <p className="text-3xl font-bold">{averageScore}%</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Export Section */}
      <Card className="bg-gradient-to-r from-green-50 via-blue-50 to-teal-50 border-2 border-gradient-to-r from-green-200 via-blue-200 to-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Download className="w-6 h-6 text-blue-600" />
            Export Induction List
            <div className="ml-auto flex items-center gap-1 text-sm text-gray-600">
              <span className="text-xs">🌴</span>
              <span>Kochi Metro Digital Report</span>
            </div>
          </CardTitle>
          <CardDescription className="text-gray-700">
            Download the complete induction list with all trainset details, rankings, and recommendations in your preferred format
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={exportToPDF}
                disabled={isExporting}
                className="w-full h-auto p-4 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
              >
                <div className="flex flex-col items-center gap-2">
                  <FileText className="w-6 h-6" />
                  <span className="font-medium">Export as PDF</span>
                  <span className="text-xs opacity-90">Detailed formatted report</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={exportToWord}
                disabled={isExporting}
                className="w-full h-auto p-4 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
              >
                <div className="flex flex-col items-center gap-2">
                  <FileType className="w-6 h-6" />
                  <span className="font-medium">Export as Word</span>
                  <span className="text-xs opacity-90">Editable document</span>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                onClick={exportToExcel}
                disabled={isExporting}
                className="w-full h-auto p-4 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg"
              >
                <div className="flex flex-col items-center gap-2">
                  <FileSpreadsheet className="w-6 h-6" />
                  <span className="font-medium">Export as Excel</span>
                  <span className="text-xs opacity-90">Data analysis ready</span>
                </div>
              </Button>
            </motion.div>
          </div>

          {isExporting && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200"
            >
              <div className="flex items-center gap-3">
                <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <span className="text-blue-800 text-sm">Generating export file... Please wait</span>
              </div>
            </motion.div>
          )}

          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-xs text-yellow-800 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>
                <strong>മലയാളം നോട്ട്:</strong> Exported files include comprehensive data for operational planning and compliance reporting.
                All formats contain the same core information optimized for different use cases.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Ranked Train List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Train className="w-6 h-6 text-blue-600" />
            Tomorrow Morning Induction Priority List
          </CardTitle>
          <CardDescription>
            Trainsets ranked by AI-powered readiness algorithm considering all operational factors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inductionData.map((train, index) => {
              const rankInfo = getRankBadge(train.rank);
              const isSelected = selectedTrain === train.trainset;
              
              return (
                <motion.div
                  key={train.trainset}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedTrain(isSelected ? null : train.trainset)}
                >
                  <Card className={`border-2 transition-all duration-300 ${
                    isSelected ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <Badge className={rankInfo.color}>
                            <rankInfo.icon className="w-4 h-4 mr-1" />
                            {rankInfo.label}
                          </Badge>
                          <div>
                            <h3 className="text-xl font-bold">{train.trainset}</h3>
                            <p className="text-sm text-gray-600">Readiness Score: {train.readinessScore}%</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getStatusColor(train.status)}>
                            {train.status}
                          </Badge>
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getScoreColor(train.readinessScore)}`}>
                              {train.readinessScore}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Progress value={train.readinessScore} className="h-3" />
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-4">
                        <div className="text-center">
                          <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs text-gray-500">Fitness</p>
                          <p className={`text-sm font-medium ${getScoreColor(train.fitnessCert.score)}`}>
                            {train.fitnessCert.score}%
                          </p>
                        </div>
                        <div className="text-center">
                          <Wrench className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs text-gray-500">Maintenance</p>
                          <p className={`text-sm font-medium ${getScoreColor(train.maintenance.score)}`}>
                            {train.maintenance.score}%
                          </p>
                        </div>
                        <div className="text-center">
                          <Fuel className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs text-gray-500">Mileage</p>
                          <p className={`text-sm font-medium ${getScoreColor(train.mileage.score)}`}>
                            {train.mileage.score}%
                          </p>
                        </div>
                        <div className="text-center">
                          <Zap className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs text-gray-500">Branding</p>
                          <p className={`text-sm font-medium ${getScoreColor(train.branding.score)}`}>
                            {train.branding.score}%
                          </p>
                        </div>
                        <div className="text-center">
                          <Star className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs text-gray-500">Cleaning</p>
                          <p className={`text-sm font-medium ${getScoreColor(train.cleaning.score)}`}>
                            {train.cleaning.score}%
                          </p>
                        </div>
                        <div className="text-center">
                          <TrendingUp className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                          <p className="text-xs text-gray-500">Yesterday</p>
                          <p className={`text-sm font-medium ${getScoreColor(train.yesterday.score)}`}>
                            {train.yesterday.score}%
                          </p>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-gray-800">{train.recommendation}</p>
                      </div>

                      {/* Blockers */}
                      {train.blockers.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-red-600 mb-2">⚠️ Critical Blockers:</h4>
                          <div className="space-y-1">
                            {train.blockers.map((blocker, idx) => (
                              <p key={idx} className="text-xs text-red-700 bg-red-50 p-2 rounded border border-red-200">
                                {blocker}
                              </p>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Detailed Reasoning (Expandable) */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t pt-4"
                        >
                          <h4 className="text-sm font-medium text-gray-800 mb-3">Detailed Ranking Analysis:</h4>
                          <div className="space-y-2">
                            {train.reasoning.map((reason, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700">{reason}</p>
                              </div>
                            ))}
                          </div>

                          {/* Detailed Metrics */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="space-y-3">
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <h5 className="text-sm font-medium text-blue-800 mb-1">Fitness Certificate</h5>
                                <p className="text-xs text-blue-700">
                                  Status: {train.fitnessCert.status} • {train.fitnessCert.daysLeft} days remaining
                                </p>
                              </div>
                              <div className="bg-green-50 p-3 rounded-lg">
                                <h5 className="text-sm font-medium text-green-800 mb-1">Maintenance</h5>
                                <p className="text-xs text-green-700">
                                  Status: {train.maintenance.status} • Last: {train.maintenance.lastService}
                                </p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg">
                                <h5 className="text-sm font-medium text-purple-800 mb-1">Mileage Balance</h5>
                                <p className="text-xs text-purple-700">
                                  Total: {train.mileage.total.toLocaleString()} km • Weekly: {train.mileage.weeklyAvg} km
                                </p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="bg-yellow-50 p-3 rounded-lg">
                                <h5 className="text-sm font-medium text-yellow-800 mb-1">Branding Contract</h5>
                                <p className="text-xs text-yellow-700">
                                  {train.branding.hasContract 
                                    ? `Active: ${train.branding.value} • ${train.branding.daysLeft} days left`
                                    : 'No active contract'
                                  }
                                </p>
                              </div>
                              <div className="bg-indigo-50 p-3 rounded-lg">
                                <h5 className="text-sm font-medium text-indigo-800 mb-1">Cleaning Status</h5>
                                <p className="text-xs text-indigo-700">
                                  Status: {train.cleaning.status} • Last: {train.cleaning.lastCleaned}
                                </p>
                              </div>
                              <div className="bg-orange-50 p-3 rounded-lg">
                                <h5 className="text-sm font-medium text-orange-800 mb-1">Yesterday Performance</h5>
                                <p className="text-xs text-orange-700">
                                  Punctuality: {train.yesterday.punctuality}% • Issues: {train.yesterday.issues}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div className="text-xs text-gray-500 mt-3 text-center">
                        Click to {isSelected ? 'collapse' : 'expand'} detailed analysis
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}