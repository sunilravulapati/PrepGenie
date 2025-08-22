export const initialTheoryContent = {
    "Arrays": { title: "Arrays", summary: "An array is a collection of items of same data type stored at contiguous memory locations.", points: ["Elements are accessed using their index.", "Arrays can be fixed-size or dynamic.", "Common operations include insertion, deletion, searching, and sorting."] },
    "Linked Lists": { title: "Linked Lists", summary: "A linked list is a linear data structure where elements are not stored at contiguous memory locations but are linked using pointers.", points: ["Each element (node) contains data and a pointer to the next node.", "Types include singly, doubly, and circular linked lists.", "Efficient for insertions and deletions compared to arrays."] },
    "Trees": { title: "Trees", summary: "A tree is a hierarchical data structure that consists of nodes connected by edges.", points: ["The top-most node is called the root.", "Nodes can have child nodes.", "Common types include Binary Trees, Binary Search Trees, and AVL Trees."] }
};

export const initialQuestions = [
    { id: 1, topic: 'Arrays', difficulty: 'Easy', title: 'Find the maximum element in an array.', status: 'unseen' },
    { id: 2, topic: 'Strings', difficulty: 'Easy', title: 'Reverse a string.', status: 'unseen' },
    { id: 3, topic: 'Arrays', difficulty: 'Medium', title: 'Find the kth largest element.', status: 'unseen' },
    { id: 4, topic: 'Trees', difficulty: 'Medium', title: 'Inorder traversal of a binary tree.', status: 'unseen' },
    { id: 5, topic: 'Dynamic Programming', difficulty: 'Hard', title: 'Longest common subsequence.', status: 'unseen' },
];