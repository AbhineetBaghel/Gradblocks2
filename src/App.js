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
  }

  return (
    <div>
      {auth.loading ? (
        "Loading"
      ) : auth.isLoggedIn ? (
        <div>
          <p>Welcome to Gradblocks</p>
           <p>Choose user type </p>

                <select id="cars">
                  <option value="volvo">Organisation</option>
                  <option value="saab">Organisation's Client</option>
                </select>
                        <br></br>
                        <br></br>
          <label htmlFor={"file-to-upload"}>File To Upload</label>
          <input id={"file-to-upload"} type={"file"}/>
          <button onClick={uploadFile}>Upload</button>
          <p id={"file-url"}/>
        </div>
      ) : (
        <div>
          <Auth externalWallet={true} theme={"light"} onLogin={onLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
