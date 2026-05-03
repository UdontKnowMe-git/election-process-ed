export const fetchRepresentativeByPincode = async (pincode) => {
  // Pure utility for Pincode search.
  // In a real app, this might call an external API like Google Civic Information API or ECI API.
  // We'll mock the response based on the Pincode.
  
  if (!pincode || pincode.length !== 6) return null;

  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data generation based on first digit of pincode
      const regionMap = {
        '1': { state: 'Delhi', mp: 'New Delhi MP', mla: 'Local MLA', local_body: 'MCD' },
        '4': { state: 'Maharashtra', mp: 'Mumbai MP', mla: 'Mumbai MLA', local_body: 'BMC' },
        '5': { state: 'Karnataka', mp: 'Bangalore MP', mla: 'Bangalore MLA', local_body: 'BBMP' },
        '6': { state: 'Tamil Nadu', mp: 'Chennai MP', mla: 'Chennai MLA', local_body: 'Chennai Corp' },
        '7': { state: 'West Bengal', mp: 'Kolkata MP', mla: 'Kolkata MLA', local_body: 'KMC' },
      };
      
      const firstDigit = pincode.charAt(0);
      
      if (pincode.startsWith('625')) {
        resolve({
          state: 'Tamil Nadu',
          mp: { name: 'Shri. S. Venkatesan (Madurai)', party: 'CPI(M)' },
          mla: { name: 'Shri. Sellur K. Raju (Madurai West)', party: 'AIADMK' },
          local_body: 'Madurai Corporation'
        });
        return;
      }
      
      const regionInfo = regionMap[firstDigit] || { state: 'State', mp: 'Local MP', mla: 'Local MLA', local_body: 'Local Panchayat/Corporation' };
      
      resolve({
        state: regionInfo.state,
        mp: { name: `Shri. ${regionInfo.mp} (${pincode})`, party: 'National Party' },
        mla: { name: `Smt. ${regionInfo.mla} (${pincode})`, party: 'Regional Party' },
        local_body: `${regionInfo.local_body} Ward Rep`
      });
    }, 500);
  });
};
