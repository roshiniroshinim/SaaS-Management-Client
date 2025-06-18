import React, { useEffect, useState } from 'react';
import '../App.css';
import microsoft1 from '../images/microsoft1.jpg';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { FaTrash, FaRegCheckCircle, FaRegUser } from 'react-icons/fa';
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GoPaste } from "react-icons/go";
import { MdEdit } from "react-icons/md"

function Dashboard() {

  const [tenants, setTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTenant, setEditingTenant] = useState(null);
  const [showFeatureModel, setShowFeatureModel] = useState(false);

  const handleEditClick = (tenant) => {
    setEditingTenant({ ...tenant });
    setShowEditModal(true);
  };

  const handleEditClose = () => {
    setEditingTenant(null);
    setShowEditModal(false);
  };


  useEffect(() => {
  
    dataFetch();  // <= enable pannaum ippothikku local data vaichu pannurom so off pannirukken <= intha symble na local kaga off pannirukken nu artham

  }, []);

  console.log(tenants);

  const dataFetch = () => {
    axios.get("https://saas-management-server.onrender.com/api/tenants")
      .then((response) => {
        setTenants(response.data);
      })
      .catch((error) => console.error(error));
  }

const filteredTenants = tenants.filter(tenant => {
  const matchName = tenant.tenantsName.toLowerCase().includes(searchTerm.toLowerCase());
  const matchStatus = statusFilter === 'All' || tenant.status === statusFilter;
  const matchProduct =
    productFilter === 'All' || tenant.products === parseInt(productFilter);

  return matchName && matchStatus && matchProduct;
});


  const handleDeleteTenant = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tenant?");
    if (confirmDelete) {
      const res = await axios.delete(`https://saas-management-server.onrender.com/api/tenants/${id}`);
      alert('delete successfull...')
      console.log(res.data);
      dataFetch(); // <=
    }
  };
// 

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

  const [userFeatureAccess,
    setUserFeatureAccess]=useState([])
    const featuresAccess = async (id) =>{
      const res = await axios.get(`https://saas-management-server.onrender.com/api/tenants/${id}/features`);
          console.log(res.data);
      setUserFeatureAccess(res.data)
      setShowFeatureModel(true);
      /*alert("saved");*/
    }
    console.log(userFeatureAccess);

    // start function
    const features = [
    {
      id:'pipeline',
      name: 'Deal Pipeline',
      enabled: false
    },
    {
      id:'task',
      name: 'Task Management',
      enabled: false
    },
    {
      id:'email',
      name: 'Email Integration',
      enabled: false
    },
    {
      id:'reporting',
      name: 'Advanced Reporting',
      enabled: false
    },
    {
      id:'analytics',
      name: 'Analytics',
      enabled: false
    },
    {
      id:'dashboards',
      name: 'Custom Dashboards',
      enabled: false
    },
    {
      id:'scheduled',
      name: 'Scheduled Reports',
      enabled: false
    },
    {
      id:'export',
      name: 'Data Export',
      enabled: false
    },
    {
      id:'api',
      name: 'API Access',
      enabled: false
    },
    {
      id:'predictive',
      name: 'Predictive Analytics',
      enabled: false
    },
    {
      id:'marketing',
      name: 'Marketing',
      enabled: false
    },
    {
      id:'support',
      name: 'Support',
      enabled: false
    }
  ];

    const addNewTenants = async (newTenant) => {
        const newCard = {...newTenant, features: features};
        try {
            await axios.post('https://saas-management-server.onrender.com/api/tenants', newCard);
            console.log(newCard);
            setTenants(prev => [...prev, newCard]);
            alert('Tenant added successfully!');
            dataFetch(); // <=
        } catch (err) {
            console.log(err);
        }
    }

      const handleUpdate = async (updatedTenant) => {
        await axios.put(`https://saas-management-server.onrender.com/api/tenants/${updatedTenant._id}`, updatedTenant);
          dataFetch(); // <=
        handleEditClose();
    };

    // end function

    const Navbar = ({handleOpen}) => {
      return(
        <div className="dashboard-header">
        <div className="header-left">
          <h2>
            <img src={microsoft1} alt="TenantHub Logo" className="logo" /> SaaS Tenant Manager
          </h2>
        </div>
        <button className="add-button" onClick={handleOpen}>+ Add New Tenant</button>
      </div>
      )
    }

    const AddNewTenants = ({ handleClose, addNewTenants }) => {
        const [newTenant, setNewTenant] = useState({
            tenantsName: '',
            domain: '',
            email: '',
            subscription: 'Free',
            status: 'Active',
            products: Math.floor(Math.random()*10)+1 ,
            createdDate: '', // Empty by default
        });

        const handleChange = (e) => {
            setNewTenant({...newTenant, [e.target.name]: e.target.value});
        }

        const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            addNewTenants(newTenant);
            console.log(newTenant);
            handleClose();
            setNewTenant('')
        } catch (err) {
            console.error(err);
            alert('Failed to add tenant');
        }
    };

      return(
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Add New Tenant</h3>
              <button className="close-btn" onClick={handleClose}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group1">
                  <label>Tenant Name</label>
                  <input type="text" name='tenantsName' value={newTenant.tenantsName} onChange={handleChange} required />
                </div>
                <div className="form-group1">
                  <label>Domain</label>
                  <input type="text" name='domain' value={newTenant.domain} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="form-group1">
                  <label>Admin Email</label>
                  <input type="email" name='email' value={newTenant.email} onChange={handleChange} required />
                </div>
                <div className="form-group1">
                  <label>Subscription Plan</label>
                  <select name='subscription' value={newTenant.subscription} onChange={handleChange}>
                    <option value="Free">Free</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Professional">Professional</option>
                    <option value="Starter">Starter</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group1">
                  <label>Status</label>
                  <select value={newTenant.status} name='status' onChange={handleChange}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group1">
                  <label>Created Date</label>
                  <input type="date" name='createdDate' value={newTenant.createdDate} onChange={handleChange}  required />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel" onClick={handleClose}>Cancel</button>
                <button type="submit" className="save">Save Tenant</button>
              </div>
            </form>
          </div>
        </div>
      )
    }

    const EditTenant = ({ isOpen, onClose, editData, onUpdate }) => {

      
   const today = new Date();
  const formattedToday = today.toISOString().split('T')[0]; // yyyy-mm-dd

   const formatToInputDate = (dateStr) => {
    if (!dateStr.includes('-')) return dateStr;
    const parts = dateStr.split('-');
    return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateStr;
  };

    const [formData, setFormData] = useState({
      tenantsName: '',
      domain: '',
      email: '',
      subscription: 'Free',
      status: 'Active',
      products: '',
      createdDate: formattedToday
    });

    console.log(editData)

    // Fill data in edit mode
     useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        createdDate: editData.createdDate
          ? formatToInputDate(editData.createdDate)
          : formattedToday
      });
    }
  }, [editData, formattedToday]);

   

    console.log(formData.createdDate)

    // Convert yyyy-mm-dd to dd-mm-yyyy for display/storage
    const formatToDisplayDate = (isoDate) => {
      const [yyyy, mm, dd] = isoDate.split('-');
      return `${dd}-${mm}-${yyyy}`;
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();

      const dataToSave = {
        ...formData,
        products: editData ? formData.products : Math.floor(Math.random() * 5) + 1,
        createdDate: formatToDisplayDate(formData.createdDate)
      };

      onUpdate(dataToSave);
      onClose();
      setFormData({
        tenantsName: '',
        domain: '',
        email: '',
        subscription: 'Free',
        status: 'Active',
        products: '',
        createdDate: formattedToday
      });
    };

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-box">
          <div className="modal-header">
            <h3>{editData ? "Edit Tenant" : "Add New Tenant"}</h3>
            <FaTimes className="close-icon" onClick={onClose} />
          </div>

          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label>Tenant Name</label>
                <input
                  type="text"
                  name="tenantsName"
                  value={formData.tenantsName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Admin Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Subscription Plan</label>
                <select name="subscription" value={formData.subscription} onChange={handleChange}>
                  <option value="Free">Free</option>
                  <option value="Enterprise">Enterprise</option>
                  <option value="Professional">Professional</option>
                  <option value="Starter">Starter</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="input-group">
                <label>Created Date</label>
                <input
                  type="date"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="btn-row">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                {editData ? "Update Tenant" : "Save Tenant"}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
    }

//     const SearchBar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, productFilter, setProductFilter }) => {
//   return (
//     <div className="search">
//       <input
//         type="text"
//         placeholder="🔍 Search tenants..."
//         className="search-input"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="dropdown">
//         <option value="All">All Statuses</option>
//         <option value="Active">Active</option>
//         <option value="Inactive">Inactive</option>
//       </select>
//       <select value={productFilter} onChange={(e) => setProductFilter(e.target.value)} className="dropdown dropdown1">
//         <option value="All">All Products</option>
//         <option value="1">1 Product</option>
//         <option value="2">2 Products</option>
//         <option value="3">3 Products</option>
//       </select>
//     </div>
//   );
// };

    const TenantsInfo = () => {
      return(
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
      )
    }

    const Cardlist = ({ tenants, featuresAccess, handleEditClick, handleDeleteTenant }) => {

      if (!Array.isArray(tenants)) {
    console.error("Expected 'tenants' to be an array, but got:", tenants);
    return <p>No tenant data available.</p>;
  }

  console.log(tenants)

      return(
        <div className="cards">
        {tenants.map((tenant) => (
          <div key={tenant._id} className="card">
            <div className="card-top">
              <div className="initials-circle">
                {tenant.tenantsName?.split(" ").map(w => w[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div className="card-info">
                <h4 className="tenant-name">{tenant.tenantsName}</h4>
                <p className="tenant-email">{tenant.domain}</p>
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
              <button className="link-btn" onClick={() => featuresAccess(tenant._id)}>Manage Products</button>


              
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
      )
    }
  
    const ManageProducts = ({ isOpen, onClose, togglesData }) => {
        
    const [featureState, setFeatureState] = useState([]);

  // Initialize featureState from props when modal opens
  useEffect(() => {
    if (isOpen) {
      const fData = togglesData.features;
      console.log(togglesData);
      setFeatureState([...fData]);
    }
  }, [isOpen, togglesData]);

  const handleToggle = (id) => {
    const updated = featureState.map(f =>
      f.id === id ? { ...f, enabled: !f.enabled } : f
    );
    setFeatureState(updated);
  };

  const handleSave = async () => {
    const id = togglesData._id;
    console.log(id);
    try {
      const res = await axios.put(`https://saas-management-server.onrender.com/api/tenants/${id}/features`, { features: featureState });
      alert(res.data.msg);
      onClose();
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
   
  };

  if (!isOpen) return null;    
      
  return (
    <div className="modal-overlay">
      <div className="manage-modal">
        <div className="modal-header">
          <h3>Manage Product Features</h3>
          <FaTimes className="close-icon" onClick={() => onClose()} />
        </div>

        <div className="modal-body">
          {productFeatures.map(section => (
            <div className='section' key={section.category}>
              {section.items.map(i => {
                const current = featureState.find(f => f.id === i.id);
                const checked = current ? current.enabled : false;

                return (
                  <div className="feature-row" key={i.id}>
                    <div className="feature-text">
                      <strong>{i.name}</strong>
                      <p>{i.desc}</p>
                    </div>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleToggle(i.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="btn-row">
          <button className="cancel-btn" onClick={() => onClose()}>Cancel</button>
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
    }

    const refreshData = () => {
      setShowFeatureModel(false);
      dataFetch(); // <=
    }

  return (
    /*Navbar*/
    <div className="dashboard">
      <Navbar handleOpen={ () => setShowModal(true) } />

      {showModal && <AddNewTenants handleClose={() => setShowModal(false)} addNewTenants={addNewTenants} />}

      {showEditModal && editingTenant && <EditTenant isOpen={showEditModal} onClose={() => setShowEditModal(false) } editData={editingTenant} onUpdate={handleUpdate} />}

      {/* <SearchBar /> */}
      {/* <SearchBar 
  searchTerm={searchTerm} 
  setSearchTerm={setSearchTerm}
  statusFilter={statusFilter} 
  setStatusFilter={setStatusFilter}
  productFilter={productFilter} 
  setProductFilter={setProductFilter}
/> */}
    <div className="search">
      <input
        type="text"
        placeholder="🔍 Search tenants..."
        className="search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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

      <TenantsInfo />

      <Cardlist
        tenants={filteredTenants}
        featuresAccess={featuresAccess}
        handleEditClick={handleEditClick}
        handleDeleteTenant={handleDeleteTenant}
      />

      <ManageProducts
        isOpen={showFeatureModel}
        onClose={refreshData}
        togglesData={userFeatureAccess}
      />

    </div>
  );
}

export default Dashboard;