/**
 * Distribute tasks evenly among agents using round-robin algorithm
 * @param {Array} records - List of task records to distribute
 * @param {Array} agents - List of available agents
 * @returns {Array} - Records with assignedAgent added to each
 */
export const distributeTasks = (records, agents) => {
  // Handle edge cases
  if (!records || records.length === 0) {
    return [];
  }

  if (!agents || agents.length === 0) {
    return [];
  }

  const distributed = [];
  let currentAgent = 0;

  for (const record of records) {
    // Skip invalid records
    if (!record) {
      continue;
    }

    distributed.push({
      ...record,
      assignedAgent: agents[currentAgent]._id,
    });

    currentAgent++;

    // Reset to first agent when reaching the end
    if (currentAgent === agents.length) {
      currentAgent = 0;
    }
  }

  return distributed;
};