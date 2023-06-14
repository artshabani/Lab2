import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PrivacySettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);

  const handleNotificationsChange = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleAutoPlayChange = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
  };

  const handleSaveSettings = (event) => {
    event.preventDefault();
    // Add logic to save the settings
    console.log('Settings saved!');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Privacy and Settings</h1>
              <Form>
                <Form.Group controlId="formNotificationsCheckbox">
                  <Form.Check
                    type="switch"
                    label="Enable notifications"
                    checked={notificationsEnabled}
                    onChange={handleNotificationsChange}
                  />
                </Form.Group>

                <Form.Group controlId="formAutoPlayCheckbox">
                  <Form.Check
                    type="switch"
                    label="Enable autoplay"
                    checked={autoPlayEnabled}
                    onChange={handleAutoPlayChange}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" onClick={handleSaveSettings} size="lg">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettingsPage;