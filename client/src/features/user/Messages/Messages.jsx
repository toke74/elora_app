import React from 'react';

const Messages = () => {
  return (
    <div>
      <h4> Hi John Smith</h4>
      <p>
        You recently requested to reset your password for your Elora app
        account, Click the button below to reset it,
      </p>
      <p>link</p>
      <p>
        {' '}
        If you did not requested a pssword reset, please ignore this email or
        reply to let us know. This password reset is only valid for the next 60
        minutes.
      </p>

      <p> Thanks,</p>
      <p> Elora App Team</p>

      <p>
        {' '}
        P.S. We also love hearing from you and helping you with any issues you
        have. Please reply to this email if you want to ask a question.
      </p>

      <p>
        If you are having trouble clicking the password reset Link , copy and
        paste the URL below into your web browser.{' '}
      </p>
    </div>
  );
};

export default Messages;
