import * as React from "react";
import { Web3Storage } from 'web3.storage';
import { Auth, useAuth } from "@arcana/auth-react";

const onLogin = () => {
  // Route to authenticated page
};

function App() {
  const [client, setClient] = React.useState(null);
  const auth = useAuth();

  React.useEffect(() => {
    const client = new Web3Storage({ token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFhZTE5MWJhMDU0ZjA5NURiNzc2YjY3MzQ4YzZlNzE4YjcyZTI4MDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY2MjIyMDM1NTMsIm5hbWUiOiJncmFkYmxvY2tzIn0.ZI26YOBhvLJcN3rdvCx7FDQhXzqX1tl2-PEiRtjCRlE"});
    setClient(client);
  }, []);

  async function uploadFile() {
    const fileInput = document.getElementById("file-to-upload");
    const cid = await client.put(fileInput.files);
    const fileUrl = document.getElementById("file-url");
    fileUrl.innerText = `https://${cid}.ipfs.dweb.link/`;
    fileUrl.style.display = "block"; // show the link after uploading the file
  }

  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #9f00c5, #7232bd)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div>
        {auth.loading ? (
          "Loading"
        ) : auth.isLoggedIn ? (
          <div>
            <h1 style={{ fontSize: '5rem', fontWeight: 'bold', color: 'white', marginBottom: '2rem' }}>Gradblocks</h1>
            <p style={{ color: 'white' }}>Choose user type </p>

            <select id="cars" style={{ marginBottom: '2rem' }}>
              <option value="volvo">Organisation</option>
              <option value="saab">Organisation's Client</option>
            </select>
            <br></br>
            <br></br>
            <label htmlFor={"file-to-upload"} style={{ color: 'white' }}>File To Upload</label>
            <input id={"file-to-upload"} type={"file"} />
            <button onClick={uploadFile} style={{ marginLeft: '1rem' }}>Upload</button>
            <p id={"file-url"} style={{ color: 'white', marginTop: '1rem', display: 'none' }} />
          </div>
        ) : (
          <div>
            <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
