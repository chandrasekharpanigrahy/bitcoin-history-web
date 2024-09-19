import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import './InputForm.css';

const FormComponent = () => {
    const [dateToPrice, setDateToPrice] = useState(null);
    const [max, setMax] = useState(null);
    const [min, setMin] = useState(null);
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [conversionRate, setConversionRate] = useState('');
    const [currency, setCurrency] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const url = "http://localhost:8080/v1/bitcoin/history?from=" + moment(from).format('YYYY-MM-DD') + "&to="
                + moment(to).format('YYYY-MM-DD') + "&currency=" + currency + "&value=" + conversionRate;
            const response = await axios.get(url);
            setDateToPrice(response.data.dateToPrice);
            setMax(response.data.max);
            setMin(response.data.min);
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
                {dateToPrice && (
                    <ul>
                        {Object.entries(dateToPrice).map(([key, value]) => (

                            <li key={key}> {key}: {value} <strong>{value===max ? "-Max":""} {value===min ? "-Min":""}</strong></li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    );
};

export default FormComponent;