import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const sortedTasks = tasks.slice().sort();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>ToDo List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={sortedTasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
    backgroundColor: "#f7f3e9", // Light coffee shade
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#5d432c", // Dark coffee shade
    textAlign: "center",
  },
  input: {
    borderWidth: 2,
    borderColor: "#c9a985", // Medium coffee shade
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    backgroundColor: "#f5e3d6", // Lighter coffee shade
  },
  addButton: {
    backgroundColor: "#5d432c", // Dark coffee shade
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#f7f3e9", // Light coffee shade
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#d1b8a2", // Medium coffee shade
    padding: 15,
    borderRadius: 10,
  },
  itemList: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#5d432c", // Dark coffee shade
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    color: "#5d432c", // Dark coffee shade
    fontWeight: "bold",
    fontSize: 18,
    marginRight: 10,
  },
  deleteButton: {
    color: "#9c7b5d", // Lighter coffee shade
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default App;
