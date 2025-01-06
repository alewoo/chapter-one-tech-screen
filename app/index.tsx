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
  const [tasks, setTasks] = useState<Task[]>([]);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task manager</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Enter a new task"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.task}>
            <Text>{task.text}</Text>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
