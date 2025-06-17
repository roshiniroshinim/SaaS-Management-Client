import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import microsoft1 from '../images/microsoft1.jpg';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Manageproducts from './Manageproducts';



import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaRegCheckCircle,
  FaRegUser
} from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GoPaste } from "react-icons/go";
import { MdEdit } from "react-icons/md"

function Dashboard() {
  const navigate = useNavigate();

  const [tenants, setTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [showFeatureModel, setShowFeatureModel] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
const [search, setSearch] = useState('');

  

  


  const [tenantName, setTenantName] = useState('');
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [subscription, setSubscription] = useState('Free');
  const [status, setStatus] = useState('Active');
  const [createdDate, setCreatedDate] = useState(new Date().toISOString().slice(0, 10));

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleEditClick = (tenant) => {
    setEditingTenant({ ...tenant });
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setEditingTenant(null);
    setShowEditModal(false);
  };

 /* const handleSubmit = (e) => {
    e.preventDefault();
    const newTenant = {
      name: tenantName,
      domain,
      email,
      subscription,
      status,
      createdDate,
      plan: subscription,
      products: 1
    };
    setTenants([...tenants, newTenant]);
    console.log(newTenant)
    handleClose();
  };*/

  // edit button function
  const handleEditSubmit = async (e) => {
    // e.preventDefault();
    // const updatedTenants = tenants.map(t =>
    //   t.id === editingTenant.id ? editingTenant : t
    // );

    const editId = editingTenant._id;
    const res = await axios.put(`http://localhost:5000/api/tenants/${editId}`, editingTenant);
    console.log('edit success..')
    // setTenants(updatedTenants);
    handleEditClose();
    dataFetch();
  };

  console.log(editingTenant);

 // ✅ Paste your useEffect HERE:
  useEffect(() => {
    // Temporary fallback data
    /*setTenants([
      {id:1, name: 'Acme Corporation', email: 'acme@example.com', status: 'Active', plan: 'Enterprise', products: 3 },
      {id:2, name: 'Globex Industries', email: 'globex@example.com', status: 'Active', plan: 'Professional', products: 2 },
      {id:3, name: 'Initech LLC', email: 'initech@example.com', status: 'Inactive', plan: 'Starter', products: 1 }
    ]);*/

    // Then fetch from backend and overwrite
    // axios.get("http://localhost:5000/api/tenants")
    //   .then((response) => {
    //     setTenants(response.data);
    //   })
    //   .catch((error) => console.error(error));

    dataFetch();

  }, []);
  console.log(tenants);

  const dataFetch = () => {
    axios.get("http://localhost:5000/api/tenants")
      .then((response) => {
        setTenants(response.data);
      })
      .catch((error) => console.error(error));
  }


 const filteredTenants = tenants.filter((tenant) => {
  // Safe lowercase for status
  const tenantStatus = (tenant.status || '').toLowerCase();
  const selected = selectedStatus.toLowerCase();

  // 1️⃣ Search filter (e.g. name or email)
  const matchesSearch =
    (tenant.name && tenant.name.toLowerCase().includes(search.toLowerCase())) ||
    (tenant.email && tenant.email.toLowerCase().includes(search.toLowerCase()));

  // 2️⃣ Status filter
  const matchesStatus =
    selectedStatus === 'All' || tenantStatus === selected;

  // 3️⃣ Product filter (ensure conversion)
  const matchesProduct =
    productFilter === 'All' || tenant.products === parseInt(productFilter);
   return matchesSearch && matchesStatus && matchesProduct;
});


  const handleDeleteTenant = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tenant?");
    if (confirmDelete) {
      // const updatedTenants = tenants.filter(t => t.email !== email);
      // setTenants(updatedTenants);
      const res = await axios.delete(`http://localhost:5000/api/tenants/${id}`);
      alert('delete successfull...')
      dataFetch();
    }
  };
// 
 const [showManageProducts, setShowManageProducts] = useState(false);
 const productFeatures = [
    {
      category: 'Core Features',
      items: [
        { id: 'pipeline', name: 'Deal Pipeline', desc: 'Track and manage sales opportunities' },
        { id: 'task', name: 'Task Management', desc: 'Create and assign tasks to team members' },
        { id: 'email', name: 'Email Integration', desc: 'Send and track emails within the CRM' },
        { id: 'reporting', name: 'Advanced Reporting', desc: 'Generate detailed sales and activity reports' }
      ]
    },
    {
      category: 'Analytics',
      items: [
        { id: 'analytics', name: 'Analytics', desc: 'Business Intelligence and Reporting' },
        { id: 'dashboards', name: 'Custom Dashboards', desc: 'Create personalized analytics dashboards' },
        { id: 'scheduled', name: 'Scheduled Reports', desc: 'Set up automated report delivery' },
        { id: 'export', name: 'Data Export', desc: 'Export data in various formats' },
        { id: 'api', name: 'API Access', desc: 'Access analytics data via API' },
        { id: 'predictive', name: 'Predictive Analytics', desc: 'AI-powered business predictions' }
      ]
    },
    {
      category: 'Marketing',
      items: [
        { id: 'marketing', name: 'Marketing', desc: 'Marketing Automation and Campaigns' }
      ]
    },
    {
      category: 'Support',
      items: [
        { id: 'support', name: 'Support', desc: 'Customer Support and Ticketing' }
      ]
    }
  ];

  const [toggles, setToggles] = useState(() => {
    const init = {};
    productFeatures.forEach(group =>
      group.items.forEach(item => (init[item.id] = true))
    );
    return init;
  });

  const handleToggle = (id) => {
    setToggles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    const result = [];
    productFeatures.forEach(section =>
      section.items.forEach(item =>
        result.push({ name: item.name, enabled: toggles[item.id] })
      )
    );
    console.log(' Feature Status:', result);
    setShowModal(false);
  };

// const ManageProducts=()=>{
//     const [showModal, setShowModal] = useState(false);

  


//   return (
//     <div className="dashboard-container">
//       <button className="btn-add" onClick={() => setShowModal(true)}>Manage Products</button>

     
//     </div>
//   );
// }
const handleSubmit = async (e) => {
    e.preventDefault();
    const newTenant = {
      name: tenantName,
      domain,
      email,
      subscription,
      status,
      createdDate,
      products: Math.floor(Math.random()*10)+1,
    };
    console.log(newTenant);
     console.log("succesfully")

    try {
        console.log("Added data")
      await axios.post('http://localhost:5000/api/tenants', newTenant);
      alert('Tenant added successfully!');
      setShowModal(false);
      /*fetchTenants();*/

      // Reset form fields
      setTenantName('');
      setDomain('');
      setEmail('');
      setSubscription('Free');
      setStatus('Active');
      setCreatedDate('');
      dataFetch();
    } catch (err) {
      console.error(err);
      alert('Failed to add tenant');
    }
  };
  

   const fetchTenants = async () => {
    const res = await axios.get('http://localhost:5000/api/tenants');
    setTenants(res.data);
  };

  const handleEdit = (tenant) => {
    setEditingTenant(tenant);
    setShowEditModal(true);
  };


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`http://localhost:5000/api/tenants/${id}`);
      fetchTenants();
    }
  };

  const handleUpdate = async (updatedTenant) => {
    await axios.put(`http://localhost:5000/api/tenants/${updatedTenant._id}`, updatedTenant);
    fetchTenants();
    handleEditClose();
  };

  useEffect(() => {
    fetchTenants();
  }, []);
 

  /*const productCount = Math.floor(Math.random()*5)+1;*/
  // console.log(productCount);

  const [userFeatureAccess,
    setUserFeatureAccess]=useState([])
    const featuresAccess =(id) =>{
      const data = tenants.find(t => t._id === id);
      setUserFeatureAccess(data)
      setShowFeatureModel(true);
      /*alert("saved");*/
    }
    console.log(userFeatureAccess)
  
  return (
    /*Navbar*/
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h2>
            <img src={microsoft1} alt="TenantHub Logo" className="logo" /> SaaS Tenant Manager
          </h2>
        </div>
        <button className="add-button" onClick={handleOpen}>+ Add New Tenant</button>
      </div>

 
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Tenant</h3>
              <button className="close-btn" onClick={handleClose}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={(e)=>handleSubmit(e)}>
              <div className="row">
                <div className="form-group1">
                  <label>Tenant Name</label>
                  <input type="text" value={tenantName} onChange={(e) => setTenantName(e.target.value)} required />
                </div>
                <div className="form-group1">
                  <label>Domain</label>
                  <input type="text" value={domain} onChange={(e) => setDomain(e.target.value)} required />
                </div>
              </div>
              <div className="row">
                <div className="form-group1">
                  <label>Admin Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group1">
                  <label>Subscription Plan</label>
                  <select value={subscription} onChange={(e) => setSubscription(e.target.value)}>
                    <option>Free</option>
                    <option>Professions</option>
                    <option>Enterprise</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group1">
                  <label>Status</label>
                  <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="form-group1">
                  <label>Created Date</label>
                  <input type="date" value={createdDate} onChange={(e) => setCreatedDate(e.target.value)} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={handleClose}>Cancel</button>
                <button type="submit" className="save">Save Tenant</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {showEditModal && editingTenant && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Edit Tenant</h3>
              <button className="close-btn" onClick={handleEditClose}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleEditSubmit}>
              <div className="row">
                <div className="form-group2">
                  <label>Tenant Name</label>
                  <input type="text" value={editingTenant.name} onChange={(e) => setEditingTenant({ ...editingTenant, name: e.target.value })} required />
                </div>
                <div className="form-group2">
                  <label>Domain</label>
                  <input type="text" value={editingTenant.domain || ''} onChange={(e) => setEditingTenant({ ...editingTenant, domain: e.target.value })} required />
                </div>
              </div>
              <div className="row">
                <div className="form-group2">
                  <label>Admin Email</label>
                  <input type="email" value={editingTenant.email} onChange={(e) => setEditingTenant({ ...editingTenant, email: e.target.value })} required />
                </div>
                <div className="form-group2">
                  <label>Subscription Plan</label>
                  <select value={editingTenant.subscription || ''} onChange={(e) => setEditingTenant({ ...editingTenant, subscription: e.target.value })}>
                    <option>Free</option>
                    <option>Professions</option>
                    <option>Enterprise</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group2">
                  <label>Status</label>
                  <select value={editingTenant.status || ''} onChange={(e) => setEditingTenant({ ...editingTenant, status: e.target.value })}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div className="form-group2">
                  <label>Created Date</label>
                  <input type="date" value={editingTenant.createdDate || ''} onChange={(e) => setEditingTenant({ ...editingTenant, createdDate: e.target.value })} />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={handleEditClose}>Cancel</button>
                <button type="submit" className="save">Save Tenant</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="search">
        <input type="text" placeholder="🔍 Search tenants..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="dropdown">
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="dropdown dropdown1">
          <option value="All">All Products</option>
          <option value="1">1 Product</option>
          <option value="2">2 Products</option>
          <option value="3">3 Products</option>
        </select>
      </div>

      <div className="stats-container">
        <div className="stat-box purple-border">
          <HiOutlineOfficeBuilding className="stat-icon" />
          <div>
            <p>Total Tenants</p>
            <h3>{tenants.length}</h3>
          </div>
        </div>
        <div className="stat-box green-border">
          <FaRegCheckCircle className="stat-icon green" />
          <div>
            <p>Active Tenants</p>
            <h3>{tenants.filter(t => t.status === 'Active').length}</h3>
          </div>
        </div>
        <div className="stat-box blue-border">
          <FaRegUser className="stat-icon blue" />
          <div>
            <p>Avg Products/Tenant</p>
        
      <h3>{tenants.length > 0 ? (tenants.reduce((sum, t) => sum + t.products, 0) / tenants.length).toFixed(1) : 0}</h3>
          </div>
        </div>
        <div className="stat-box pink-border">
          <GoPaste className="stat-icon pink" />
          <div>
            <p>Total Features Enabled</p>
            <h3>18</h3>
          </div>
        </div>
      </div>

     <div className="cards">
        {tenants.map((tenant, idx) => (
          <div key={idx} className="card">
            <div className="card-top">
              <div className="initials-circle">
                {tenant.name?.split(" ").map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="card-info">
                <h4 className="tenant-name">{tenant.name}</h4>
                <p className="tenant-email">{tenant.email}</p>
              </div>
            </div>
            <div className="column">
              <div className="badges">
                <span className={`badge ${tenant.status.toLowerCase()}`}>{tenant.status}</span>
                <span className="badge gray">{ tenant.subscription }</span>
              </div>
              <p className="products-text"><strong>{tenant.products ?? Math.floor(Math.random()*10)+1 } Products</strong></p>
            </div>
            <hr className="card-divider" />
            <div className="card-footer">
              <button className="link-btn" onClick={featuresAccess}>Manage Products</button>


              
              <div className="icon-buttons">
                <button onClick={() => handleEditClick(tenant)}><MdEdit /></button>
                <button onClick={() => handleDeleteTenant(tenant._id)}>
    <FaTrash className="edit-icon" />
  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
{/* <ManageProducts/> */}
        {showManageProducts && (
            <div className="modal-overlay">
            <div className="manage-modal">
              <div className="modal-header">
                <h3>Manage Product Features</h3>
                <FaTimes className="close-icon" onClick={() => setShowManageProducts(false)} />
              </div>
  
              <div className="modal-body">
                {productFeatures.map(section => (
                  <div className="section" key={section.category}> 
                  {/* logic category === name ? first switch next contant tomorrow plan */}
                    <h4>{section.category}</h4>
                    {section.items.map(item => (
                      <div className="feature-row" key={item.id}>
                        <div className="feature-text">
                          <strong>{item.name}</strong>
                          <p>{item.desc}</p>
                        </div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={toggles[item.id]}
                            onChange={() => handleToggle(item.id)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
  
              <div className="btn-row">
                <button className="cancel-btn" onClick={() => setShowManageProducts(false)}>Cancel</button>
                <button className="save-btn" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

       
 
        <Manageproducts
        isOpen={showFeatureModel}
        onClose={() => setShowFeatureModel(false)}
        togglesData={userFeatureAccess}
      />
      
{/*  */}
    </div>
  );
}

export default Dashboard;