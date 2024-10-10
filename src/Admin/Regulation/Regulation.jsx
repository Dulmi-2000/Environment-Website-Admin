import React from 'react'
import Topbar from '../../Components/Topbar/Topbar'
import './regulation.css'

function Regulation() {
  return (
      <>
      <div className="dashboard-topbar">
          <Topbar/>
      </div>
      <div className="dashboard-container">
                <div className="dashboard-content">
                <h5 className='headings'>Upload Regulations</h5>
            <table className='data-table'>
              <thead>
              <tr>
                <th>Category of the Regulation</th>
                <th>Upload</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td> Act</td>
                  <td>  
                    <a href="http://localhost:5001/download/Rapid-Rail-Guideline-CEA_Compressed" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
                </tr>
                <tr>
                  <td> Environment Protection</td>
                  <td>  
                    <a href="http://localhost:5001/download/Rapid-Rail-Guideline-CEA_Compressed" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
                </tr>
                <tr>
                  <td>Industrial Effluent (Water) Quality Management</td>
                  <td>  
                    <a href="http://localhost:5001/download/Expressway-Guideline-CEA_Compressed" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
                </tr>
                <tr>
                  <td>Procedure for Issuance of Environmental Protection Licenses (EPLs).</td>
                  <td>  
                    <a href="http://localhost:5001/download/AQI-SL_Calculation_Guideline_CEA.LK_V1.0" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
                </tr>
                <tr>
                  <td>	Environmental Protection licenses Appellate Procedure</td>
                  <td>  
                    <a href="http://localhost:5001/download/CRAP-DAQ-SL_Contingency_Response_Action_Plan_for_Deterioration_of_Air_Quality_in_Sri_Lanka_V1.0-1" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
              </tr>
              <tr>
                  <td>Ambient Water Quality Control</td>
                  <td>  
                    <a href="http://localhost:5001/download/CRAP-DAQ-SL_Contingency_Response_Action_Plan_for_Deterioration_of_Air_Quality_in_Sri_Lanka_V1.0-1" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
                </tr>
                <tr>
                  <td>Air Quality</td>
                  <td>  
                    <a href="http://localhost:5001/download/CRAP-DAQ-SL_Contingency_Response_Action_Plan_for_Deterioration_of_Air_Quality_in_Sri_Lanka_V1.0-1" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
              </tr>
              <tr>
                  <td>Waste Management</td>
                  <td>  
                    <a href="http://localhost:5001/download/CRAP-DAQ-SL_Contingency_Response_Action_Plan_for_Deterioration_of_Air_Quality_in_Sri_Lanka_V1.0-1" download>
                    <button className='submit-btn'>Upload</button>
                   </a></td>
                </tr>
              </tbody>
            </table>
         </div>
    </div>
                
  </>
  )
}

export default Regulation