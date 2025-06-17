import { useState } from "react";
import { FaTimes } from 'react-icons/fa';


const AddTenantModal = ({ isOpen, onClose, onSave }) => {

    const [formData, setFormData] = useState({
       tenantsName: '',
       domain: '',
       adminEmail: '',
       subscriptionPlan: 'Free',
       status: 'Active',
       products: '',
       createdDate: '', // Empty by default
    });

    // const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const formatDate = (isoDate) => {
    //    if (!isoDate) return '';
    //    const [yyyy, mm, dd] = isoDate.split('-');
    //    return `${dd}-${mm}-${yyyy}`;
    // };

    // console.log(Math.floor(Math.random()*5)+1);

    const handleSubmit = (e) => {
       e.preventDefault();
       const dataToLog = {
         ...formData,
         products: Math.floor(Math.random()*5)+1,
         createdDate: formattedToday,
       };

       onSave(dataToLog);
       console.log('📦 Tenant Data Submitted:', dataToLog);
       // setShowModal(false);
       onClose();
       setFormData('');
    };

    if (!isOpen) return null

    return(
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Add New Tenant</h3>
              <FaTimes className="close-icon" onClick={() => onClose()} />
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
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <label>Subscription Plan</label>
                  <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange}>
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
                       type="text"
                       name="createdDate"
                       value={formattedToday}
                       readOnly // or use disabled
                   />
                </div>
              </div>

              <div className="btn-row">
                <button type="button" className="cancel-btn" onClick={() => onClose()}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">Save Tenant</button>
              </div>
            </form>
          </div>
        </div>
    )
}

export default AddTenantModal;