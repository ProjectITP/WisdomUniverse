import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from 'moment';

const GenerateReport = (marks)=>{
    // initialize jsPDF
    const doc = new jsPDF();
  
    // define the columns we want and their titles
    const tableColumn = ["Exam Name", "Subject", "From Date", "To Date","Created By"];
    // define an empty array of rows
    const tableRows = [];
  
    // for each ticket pass all its data into an array
    marks.forEach(markStd => {
      const markStdData = [
        markStd.name,
        markStd.subject,
        moment(markStd.FromDate).format('DD-MM-YYYY HH:mm'),
        moment(markStd.ToDate).format('DD-MM-YYYY HH:mm'),
        markStd.instructor
      ];
      // push each tickcet's info into a row
      tableRows.push(markStdData);
    });
  
    
    // startY is basically margin-top
    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    const date = Date().split(" ");
    // we use a date string to generate our filename.
    const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
    // ticket title. and margin-top + margin-left
    doc.text(`All Created Assignments Report`, 14, 15);
    // we define the name of our PDF file.
    doc.save(`report_exams_${dateStr}.pdf`);
};
  
export default GenerateReport;