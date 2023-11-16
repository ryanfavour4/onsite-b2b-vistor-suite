import React from 'react';
// import './Contact.css';

const Contact = () => {
    return (
        <div className="contact container p-3">
            <h2 className="text-center text-2xl text-uppercase font-bold mb-10">
                Set up when and how we can contact you
            </h2>

            <div className="flex justify-center">
                <div className="w-2/3">
                    <form>
                        <div className="mb-6">
                            <label htmlFor="email" className="text-xl mb-2 block font-normal">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-input rounded-lg w-full py-3 px-4 text-lg"
                                id="email"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="phone" className="text-xl mb-2 block font-normal">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                className="form-input rounded-lg w-full py-3 px-4 text-lg"
                                id="phone"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="date" className="text-xl mb-2 block font-normal">
                                Preferred Date
                            </label>
                            <input
                                type="date"
                                className="form-input rounded-lg w-full py-3 px-4 text-lg"
                                id="date"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="time" className="text-xl mb-2 block font-normal">
                                Preferred Time
                            </label>
                            <input
                                type="time"
                                className="form-input rounded-lg w-full py-3 px-4 text-lg"
                                id="time"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="timezone" className="text-xl mb-2 block font-normal">
                                Timezone
                            </label>
                            <select className="form-select rounded-lg w-full py-3 px-4 text-lg" id="timezone">
                                <option value="EST">EST</option>
                                <option value="CST">CST</option>
                                <option value="PST">PST</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="text-xl mb-2 block font-normal">
                                Do you have any specific or custom requests for Carrotsuite Space? </label>
                            <textarea
                                placeholder="I hope astronauts can help..."
                                className="form-textarea rounded-lg w-full py-3 px-4 text-lg resize-none"
                                id="message"
                                rows="3"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-3 text-xl w-full"
                        >
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
