const handleSave = async (tenantData) => {
  try {
    await axios.post('http://localhost:5000/api/tenants', tenantData);
    alert('✅ Tenant added successfully!');
  } catch (error) {
    console.error('❌ Error saving tenant:', error);
    alert('❌ Error occurred');
  }
};
