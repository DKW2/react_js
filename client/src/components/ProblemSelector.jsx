import React from 'react';

function ProblemSelector({ selectedProblem, onProblemChange }) {
  const leetcodeProblems = [
    { id: 'LIS', name: 'Longest Increasing Subsequence' },
    { id: 'TwoSum', name: 'Two Sum' },
    { id: 'AddTwoNumbers', name: 'Add Two Numbers' },
    { id: 'LongestSubstring', name: 'Longest Substring Without Repeating Characters' },
    { id: 'MedianOfTwoArrays', name: 'Median of Two Sorted Arrays' },
    { id: 'Palindrome', name: 'Longest Palindromic Substring' },
    { id: 'ZigZag', name: 'ZigZag Conversion' },
    { id: 'ReverseInteger', name: 'Reverse Integer' },
    { id: 'Atoi', name: 'String to Integer (atoi)' },
    { id: 'ContainerWithMostWater', name: 'Container With Most Water' }
  ];

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Select LeetCode Problem:
      </label>
      <select 
        value={selectedProblem} 
        onChange={(e) => onProblemChange(e.target.value)}
        style={{ 
          width: '100%', 
          padding: '8px', 
          borderRadius: '4px', 
          border: '1px solid #ccc',
          fontSize: '14px'
        }}
      >
        <option value="">Choose a problem...</option>
        {leetcodeProblems.map(problem => (
          <option key={problem.id} value={problem.id}>
            {problem.id}: {problem.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProblemSelector;
