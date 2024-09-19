import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import './InputForm.css';

const FormComponent = () => {
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [conversionRate, setConversionRate] = useState('');
    const [currency, setCurrency] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const url = "http://localhost:8080/v1/bitcoin/history?from="+moment(from).format('YYYY-MM-DD')+"&to="
            + moment(to).format('YYYY-MM-DD') + "&currency=" + currency + "&value=" + conversionRate;
            const response = await axios.get(url);
            console.log('Form submitted successfully:', response.data);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
    }
   
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>From</label>
                    <DatePicker selected={from} onChange={(date) => setFrom(date)} />
                </div>
                <div className="form-group">
                    <label>To</label>
                    <DatePicker selected={to} onChange={(date) => setTo(date)} />
                </div>
                <div className="form-group">
                    <label>Conversion Rate:</label>
                    <input
                        type="number"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Text Field:</label>
                    <input
                        type="text"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormComponent;