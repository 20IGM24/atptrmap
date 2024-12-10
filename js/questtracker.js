import "../css/qtags.css";
import qtags from "../data/maps/qtags.json";

class QuestTracker {
  constructor(containerId, data) {
    this.container = document.getElementById(containerId);

    // Check if the container is found
    if (!this.container) {
      console.error(`Element with ID ${containerId} not found.`);
      return;
    }

    this.quests = data;
    this.render();
  }

  toggleCompletion(index) {
    if (this.quests[index]) {
      this.quests[index].completed = !this.quests[index].completed;
      this.render();
    }
  }

  toggleChildCompletion(parentIndex, childIndex) {
    if (this.quests[parentIndex] && this.quests[parentIndex].children[childIndex]) {
      const child = this.quests[parentIndex].children[childIndex];
      child.completed = !child.completed;
      // Check if all children are completed, then mark the parent as completed
      const allCompleted = this.quests[parentIndex].children.every(child => child.completed);
      this.quests[parentIndex].completed = allCompleted;
      this.render();
    }
  }

  removeQuest(index) {
    if (this.quests[index]) {
      this.quests.splice(index, 1);
      this.render();
    }
  }

  reset() {
    this.quests = qtags.map(quest => ({
      ...quest,
      completed: false,
      children: quest.children.map(child => ({ ...child, completed: false }))
    }));
    this.render();
  }

  render() {
    if (!this.container) return; // Ensure container exists
    this.container.innerHTML = ''; // Clear existing content
    this.quests.forEach((quest, index) => {
      const questDiv = document.createElement('div');
      questDiv.className = 'quest-item';
      if (quest.completed) {
        questDiv.classList.add('completed');
      }
      questDiv.innerHTML = `
        <span class="quest-name">${quest.name}</span>
        <button onclick="questTracker.removeQuest(${index})">Remove</button>
        <div class="quest-children">
          ${quest.children.map((child, childIndex) => `
            <div class="quest-child ${child.completed ? 'completed' : ''}" onclick="questTracker.toggleChildCompletion(${index}, ${childIndex})">
              <input type="checkbox" ${child.completed ? 'checked' : ''} />
              ${child.name}
            </div>
          `).join('')}
        </div>
      `;
      this.container.appendChild(questDiv);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize QuestTracker and verify that the element exists
  const questTracker = new QuestTracker('qtag-selector-content', qtags);

  document.getElementById('qtag-selector-btn').addEventListener('click', () => {
    const qtagSelector = document.getElementById('qtag-selector');
    if (qtagSelector) {
      qtagSelector.style.display = qtagSelector.style.display === 'none' || !qtagSelector.style.display ? 'block' : 'none';
    } else {
      console.error('Element with ID qtag-selector not found.');
    }
  });

  document.getElementById('reset-button').addEventListener('click', () => {
    questTracker.reset();
  });
});

export { QuestTracker };
