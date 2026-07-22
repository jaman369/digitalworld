// Revert ecommerce-seo test data back to original
const BLOB_URL = "https://jsonblob.com/api/jsonBlob/019f82d8-da7f-7324-a73b-f5ef41a31206";

async function revert() {
  const res = await fetch(BLOB_URL, { headers: { "Accept": "application/json" } });
  const data = await res.json();
  
  // Remove the test entry for ecommerce-seo (let it use default data)
  if (data.services && data.services["ecommerce-seo"]) {
    delete data.services["ecommerce-seo"];
    const putRes = await fetch(BLOB_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    });
    console.log("Reverted ecommerce-seo, PUT status:", putRes.status);
  }
  
  // Verify
  const verifyRes = await fetch(BLOB_URL, { headers: { "Accept": "application/json" } });
  const verifyData = await verifyRes.json();
  console.log("Current services:", Object.keys(verifyData.services || {}));
}

revert().catch(console.error);
