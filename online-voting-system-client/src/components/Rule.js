import React from 'react'
// VotingRule component represents each individual voting rule
function VotingRule({ description }) {
  return (
    <div>
      <p><i className="bi bi-dot"></i> {description}</p>
      <hr />
    </div>
  );
}

// VotingRulesApp is the main component that renders all the voting rules
function Rule() {
  return (
    <div className='container card mt-3'>
      <h1>Voting Rules</h1>
      <VotingRule
        description="Every citizen of India who is 18 years of age or older is entitled to vote in elections, subject to certain exceptions and disqualifications specified by law."
      />
      <VotingRule
        description="To vote in an election, a person must be registered as a voter in the electoral roll of the constituency where they reside."
      />
      <VotingRule
        description="Upon successful registration, eligible voters are issued a Voter ID Card (EPIC) by the Election Commission."
      />
      <VotingRule
        description="Each eligible voter is entitled to cast only one vote in an election, irrespective of their social status, wealth, or other factors."
      />
      <VotingRule
        description="Voting in India is conducted through secret ballot, ensuring the confidentiality of an individual's voting preferences."
      />
    </div>
  );
}

export default Rule;