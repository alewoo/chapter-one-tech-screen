import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// define what a task looks like
type Task = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Index() {
  // state to store our tasks
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Welcome! Try adding a new task",
      completed: false,
    },
    {
      id: "2",
      text: "This is a completed task example",
      completed: true,
    },
  ]);
  // state to create a new task
  const [newTask, setNewTask] = useState("");

  // function to add a new task
  const addTask = () => {
    if (newTask.trim().length === 0) return;

    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false,
    };

    setTasks([...tasks, task]); // add the task
    setNewTask(""); // clear the input
  };

  // function to toggle task completion
  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // function to delete a task
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task manager</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter a new task"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskList}>
        {/* active tasks section */}
        <Text style={styles.sectionTitle}>Active Tasks</Text>
        {tasks
          .filter((task) => !task.completed)
          .map((task) => (
            <View key={task.id} style={styles.task}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTask(task.id)}
              >
                {task.completed && <Text>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.taskText}>{task.text}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}

        {/* completed tasks section */}
        <Text style={[styles.sectionTitle, styles.completedTitle]}>
          Completed Tasks
        </Text>
        {tasks
          .filter((task) => task.completed)
          .map((task) => (
            <View key={task.id} style={[styles.task, styles.completedTaskRow]}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => toggleTask(task.id)}
              >
                <Text>✓</Text>
              </TouchableOpacity>
              <Text style={[styles.taskText, styles.completedTask]}>
                {task.text}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  taskList: {
    flex: 1,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    flex: 1,
  },
  completedTask: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: "#ff0000",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  completedTitle: {
    color: "#888",
  },
  completedTaskRow: {
    opacity: 0.7,
  },
});
