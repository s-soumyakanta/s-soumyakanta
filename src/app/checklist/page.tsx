import React, { useState, useEffect, useCallback, useMemo } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
type PhaseId = "beginner" | "intermediate" | "advanced" | "professional";
type Difficulty = "Easy" | "Medium" | "Hard";
type ViewType = "roadmap" | "stats";
type TabType = "learn" | "concepts" | "practice";

interface PhaseInfo {
  color: string;
  glow: string;
  label: string;
  stages: string;
}

interface DifficultyInfo {
  fg: string;
  bg: string;
}

interface Theme {
  bg: string;
  surface: string;
  raised: string;
  border: string;
  borderHi: string;
  muted: string;
  subtle: string;
  body: string;
  strong: string;
  heading: string;
  phases: Record<PhaseId, PhaseInfo>;
  diff: Record<Difficulty, DifficultyInfo>;
}

interface PracticeTask {
  name: string;
  link: string;
  difficulty: Difficulty;
  tag: string;
}

interface Stage {
  stage: number;
  phase: PhaseId;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  concepts: string[];
  learn: string[];
  practice: PracticeTask[];
}

// ─── THEME ────────────────────────────────────────────────────────────────────
const T: Theme = {
  bg:        "#0E1117",
  surface:   "#161B22",
  raised:    "#1C2333",
  border:    "#21262D",
  borderHi:  "#30363D",
  muted:     "#484F58",
  subtle:    "#6E7681",
  body:      "#8B949E",
  strong:    "#C9D1D9",
  heading:   "#E6EDF3",
  phases: {
    beginner:     { color: "#3FB950", glow: "rgba(63,185,80,0.15)",  label: "Beginner",     stages: "1 – 4"  },
    intermediate: { color: "#D29922", glow: "rgba(210,153,34,0.15)", label: "Intermediate", stages: "5 – 9"  },
    advanced:     { color: "#F78166", glow: "rgba(247,129,102,0.15)",label: "Advanced",     stages: "10–14" },
    professional: { color: "#BC8CFF", glow: "rgba(188,140,255,0.15)",label: "Professional", stages: "15–18" },
  },
  diff: {
    Easy:   { fg: "#3FB950", bg: "rgba(63,185,80,0.1)"   },
    Medium: { fg: "#D29922", bg: "rgba(210,153,34,0.1)"  },
    Hard:   { fg: "#F78166", bg: "rgba(247,129,102,0.1)" },
  },
};

// ─── CURRICULUM DATA ──────────────────────────────────────────────────────────
const CURRICULUM: Stage[] = [
  /* ═══════════════════════ BEGINNER ═══════════════════════ */
  {
    stage: 1, phase: "beginner",
    title: "Go Language Foundations",
    subtitle: "Install Go, understand tooling, write your first programs",
    color: T.phases.beginner.color, accent: T.phases.beginner.glow,
    concepts: [
      "Install Go & configure GOPATH / GOROOT",
      "go env, go version, go help",
      "package main and func main() entry point",
      "fmt.Println / Printf / Sprintf / Errorf",
      "var declarations, := short syntax, zero values",
      "Basic types: int, int8/16/32/64, uint, float32/64, bool, byte, rune",
      "string — immutable UTF-8 byte sequence, len(), indexing",
      "rune vs byte: Unicode awareness",
      "const and iota for typed enumerations",
      "Explicit type conversion (no implicit casting)",
      "if / else with init statement, no parentheses",
      "for loop — Go's only loop (acts as while / do-while)",
      "range on strings, slices, maps, channels",
      "switch — no fallthrough, expressionless switch",
      "Blank identifier _",
      "Multiple assignment & swap: a, b = b, a",
    ],
    learn: [
      "Read: tour.golang.org — Basics section",
      "Read: go.dev/doc/effective_go — Formatting & Names",
      "Code: Write a temperature converter (C↔F↔K)",
      "Code: FizzBuzz without if chains (use switch)",
      "Code: Caesar cipher — practice rune iteration",
    ],
    practice: [
      { name: "FizzBuzz",                    link: "https://leetcode.com/problems/fizz-buzz/",                                    difficulty: "Easy",   tag: "Loops"    },
      { name: "Palindrome Number",           link: "https://leetcode.com/problems/palindrome-number/",                            difficulty: "Easy",   tag: "Math"     },
      { name: "Reverse Integer",             link: "https://leetcode.com/problems/reverse-integer/",                              difficulty: "Medium", tag: "Math"     },
      { name: "Number of Steps to Zero",     link: "https://leetcode.com/problems/number-of-steps-to-reduce-a-number-to-zero/",   difficulty: "Easy",   tag: "Bit/Math" },
      { name: "Count Odd Numbers in Range",  link: "https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/",       difficulty: "Easy",   tag: "Math"     },
    ],
  },
  {
    stage: 2, phase: "beginner",
    title: "Arrays, Slices & Maps",
    subtitle: "Go's primary containers — master these completely",
    color: T.phases.beginner.color, accent: T.phases.beginner.glow,
    concepts: [
      "Arrays — [n]T, fixed size, value type semantics",
      "Slices — []T, reference type, len vs cap",
      "make([]T, len, cap) and nil slice vs empty slice",
      "append() — growth mechanics, backing array reallocation",
      "copy() — shallow copy, returns bytes copied",
      "3-index slicing a[low:high:max] — cap limiting",
      "2D slices: make([][]int, rows) pattern",
      "range on slices — index and value are copies",
      "sort.Ints / sort.Strings / sort.Slice / sort.SliceStable",
      "sort.Search — binary search on sorted slice",
      "Maps: make(map[K]V), map literals, nil map panic",
      "Comma-ok idiom: val, ok := m[key]",
      "delete(m, key) and zero-value behavior",
      "Map iteration order is random — never rely on it",
      "Map as set: map[T]struct{} — zero-size values",
      "Structs: field access, named and positional literals",
      "Anonymous structs for temporary data grouping",
      "Struct embedding for composition",
      "Struct tags: `json:\"name,omitempty\"` `db:\"name\"`",
    ],
    learn: [
      "Read: go.dev/blog/slices-intro — definitive slice guide",
      "Code: Implement a generic stack using []interface{}",
      "Code: Word frequency counter with map[string]int",
      "Code: Remove duplicates from slice in-place",
      "Code: Implement set operations using map[int]struct{}",
    ],
    practice: [
      { name: "Two Sum",                     link: "https://leetcode.com/problems/two-sum/",                                difficulty: "Easy",   tag: "Maps"   },
      { name: "Contains Duplicate",          link: "https://leetcode.com/problems/contains-duplicate/",                     difficulty: "Easy",   tag: "Maps"   },
      { name: "Valid Anagram",               link: "https://leetcode.com/problems/valid-anagram/",                          difficulty: "Easy",   tag: "Maps"   },
      { name: "Majority Element",            link: "https://leetcode.com/problems/majority-element/",                       difficulty: "Easy",   tag: "Maps"   },
      { name: "Product of Array Except Self",link: "https://leetcode.com/problems/product-of-array-except-self/",           difficulty: "Medium", tag: "Arrays" },
      { name: "Group Anagrams",              link: "https://leetcode.com/problems/group-anagrams/",                         difficulty: "Medium", tag: "Maps"   },
      { name: "Encode and Decode Strings",   link: "https://leetcode.com/problems/encode-and-decode-strings/",              difficulty: "Medium", tag: "Strings"},
    ],
  },
  {
    stage: 3, phase: "beginner",
    title: "Functions, Pointers & Errors",
    subtitle: "Go's philosophy: explicit, honest, no magic",
    color: T.phases.beginner.color, accent: T.phases.beginner.glow,
    concepts: [
      "Functions — multiple return values, named returns",
      "Variadic functions: func f(args ...T) and spread ...",
      "First-class functions: func types, callbacks",
      "Closures — capturing variables by reference",
      "Immediately Invoked Function Expressions (IIFE)",
      "defer — LIFO execution, argument evaluated immediately",
      "defer with closure to capture loop variable",
      "panic() — unrecoverable errors, stack unwinding",
      "recover() — catching panics in deferred function",
      "Pointers: & (address-of), * (dereference), nil pointer",
      "Pass by value vs pass by pointer — rule of thumb",
      "Methods on structs — value vs pointer receivers",
      "Pointer receivers for mutation and large structs",
      "errors.New / fmt.Errorf for error creation",
      "Custom error types: Error() string method",
      "errors.Is / errors.As — structured error inspection",
      "fmt.Errorf %w — wrapping for unwrap chains",
      "Sentinel errors: var ErrNotFound = errors.New(...)",
      "Never ignore errors — always handle if err != nil",
    ],
    learn: [
      "Read: go.dev/blog/error-handling-and-go",
      "Read: go.dev/doc/faq#closures_and_goroutines",
      "Code: Implement functional options pattern",
      "Code: Build a retry function with exponential backoff",
      "Code: Create a custom error type with context fields",
    ],
    practice: [
      { name: "Climbing Stairs",             link: "https://leetcode.com/problems/climbing-stairs/",            difficulty: "Easy",   tag: "Recursion" },
      { name: "Fibonacci Number",            link: "https://leetcode.com/problems/fibonacci-number/",           difficulty: "Easy",   tag: "Recursion" },
      { name: "Power of Two",                link: "https://leetcode.com/problems/power-of-two/",               difficulty: "Easy",   tag: "Recursion" },
      { name: "Reverse Linked List",         link: "https://leetcode.com/problems/reverse-linked-list/",        difficulty: "Easy",   tag: "Pointers"  },
      { name: "Swap Nodes in Pairs",         link: "https://leetcode.com/problems/swap-nodes-in-pairs/",        difficulty: "Medium", tag: "Pointers"  },
    ],
  },
  {
    stage: 4, phase: "beginner",
    title: "Interfaces, Packages & Modules",
    subtitle: "Go's type system — implicit, composable, powerful",
    color: T.phases.beginner.color, accent: T.phases.beginner.glow,
    concepts: [
      "Interface definition — set of method signatures",
      "Implicit satisfaction — no implements keyword",
      "Interface variables: (type, value) pair internally",
      "Nil interface vs interface holding nil pointer",
      "Empty interface{} / any — type erasure, use carefully",
      "Type assertion: v.(T) and safe form v, ok := i.(T)",
      "Type switch: switch v := i.(type) { case T: }",
      "io.Reader and io.Writer — cornerstone interfaces",
      "fmt.Stringer — String() string for pretty printing",
      "sort.Interface — Len, Less, Swap",
      "Interface composition: type ReadWriter = Reader + Writer",
      "Packages — one package per directory, lowercase names",
      "Exported identifiers — uppercase first letter",
      "Unexported identifiers — package-private",
      "init() — execution order, use sparingly",
      "go mod init / go mod tidy / go mod vendor",
      "go get, go install, dependency versioning (semver)",
      "internal/ package — restricted imports",
      "Build constraints: //go:build linux,amd64",
    ],
    learn: [
      "Read: go.dev/doc/effective_go — Interfaces section",
      "Read: go.dev/blog/laws-of-reflection",
      "Code: Implement io.Reader for a custom data source",
      "Code: Build a plugin system using interfaces",
      "Code: Create a multi-format logger (stdout/file/noop)",
    ],
    practice: [
      { name: "Design HashMap",                  link: "https://leetcode.com/problems/design-hashmap/",                   difficulty: "Easy",   tag: "Design"        },
      { name: "Min Stack",                       link: "https://leetcode.com/problems/min-stack/",                        difficulty: "Medium", tag: "Interface"     },
      { name: "Implement Queue using Stacks",    link: "https://leetcode.com/problems/implement-queue-using-stacks/",     difficulty: "Easy",   tag: "Design"        },
      { name: "LRU Cache",                       link: "https://leetcode.com/problems/lru-cache/",                        difficulty: "Medium", tag: "Design"        },
      { name: "Design Twitter",                  link: "https://leetcode.com/problems/design-twitter/",                   difficulty: "Medium", tag: "OOP in Go"     },
    ],
  },

  /* ═══════════════════════ INTERMEDIATE ═══════════════════════ */
  {
    stage: 5, phase: "intermediate",
    title: "Two Pointers & Sliding Window",
    subtitle: "The most frequent interview pattern — every variant",
    color: T.phases.intermediate.color, accent: T.phases.intermediate.glow,
    concepts: [
      "Two pointers — opposite ends (sorted array) template",
      "Two pointers — same direction (fast/slow) template",
      "Shrink/expand decision logic for variable window",
      "Fixed-size sliding window template",
      "Variable-size sliding window template",
      "Frequency map inside window: map[byte]int",
      "Window validity and shrink condition patterns",
      "Prefix sums: preSum[i+1] = preSum[i] + nums[i]",
      "Difference arrays for O(1) range updates",
      "Subarray sum = K using prefix sum + hash map",
      "Kadane's algorithm — max subarray O(n)",
      "Kadane's for circular array variant",
      "Dutch National Flag (3-way partition)",
    ],
    learn: [
      "Study: neetcode.io sliding window patterns",
      "Code: Implement all 4 window templates from scratch",
      "Code: Find all anagrams in string — sliding window",
      "Code: Minimum size subarray sum — variable window",
      "Code: Maximum sum of subarray size K — fixed window",
    ],
    practice: [
      { name: "Best Time to Buy & Sell Stock",           link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",                  difficulty: "Easy",   tag: "Sliding Window"  },
      { name: "Valid Palindrome",                        link: "https://leetcode.com/problems/valid-palindrome/",                                 difficulty: "Easy",   tag: "Two Pointers"    },
      { name: "3Sum",                                    link: "https://leetcode.com/problems/3sum/",                                             difficulty: "Medium", tag: "Two Pointers"    },
      { name: "Container With Most Water",               link: "https://leetcode.com/problems/container-with-most-water/",                        difficulty: "Medium", tag: "Two Pointers"    },
      { name: "Longest Substring Without Repeating",     link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",   difficulty: "Medium", tag: "Sliding Window"  },
      { name: "Longest Repeating Char Replacement",      link: "https://leetcode.com/problems/longest-repeating-character-replacement/",          difficulty: "Medium", tag: "Sliding Window"  },
      { name: "Subarray Sum Equals K",                   link: "https://leetcode.com/problems/subarray-sum-equals-k/",                            difficulty: "Medium", tag: "Prefix Sum"      },
      { name: "Minimum Window Substring",                link: "https://leetcode.com/problems/minimum-window-substring/",                         difficulty: "Hard",   tag: "Sliding Window"  },
      { name: "Sliding Window Maximum",                  link: "https://leetcode.com/problems/sliding-window-maximum/",                           difficulty: "Hard",   tag: "Monotonic Queue" },
    ],
  },
  {
    stage: 6, phase: "intermediate",
    title: "Stacks, Queues & Monotonic Structures",
    subtitle: "Stack-based patterns power 20% of hard problems",
    color: T.phases.intermediate.color, accent: T.phases.intermediate.glow,
    concepts: [
      "Stack with slice: push = append, pop from end",
      "Queue with two stacks — amortized O(1)",
      "Circular queue / ring buffer full implementation",
      "Deque (double-ended queue) with container/list",
      "Monotonic increasing stack — template + invariant",
      "Monotonic decreasing stack — template + invariant",
      "Next Greater Element (NGE) pattern",
      "Previous Smaller Element (PSE) pattern",
      "Sum of subarray minimums — stack contribution",
      "Monotonic queue for sliding window min/max",
      "Expression evaluation: infix → postfix → evaluate",
      "Go: container/list as doubly linked list",
      "Go: container/ring for circular buffer",
    ],
    learn: [
      "Visualize: Draw the stack state for Daily Temperatures",
      "Code: NGE for circular array using monotonic stack",
      "Code: Implement a browser history (back/forward) with stacks",
      "Code: Deque from scratch without container/list",
      "Study: When monotonic stack beats brute force O(n²)→O(n)",
    ],
    practice: [
      { name: "Valid Parentheses",              link: "https://leetcode.com/problems/valid-parentheses/",                  difficulty: "Easy",   tag: "Stack"             },
      { name: "Daily Temperatures",             link: "https://leetcode.com/problems/daily-temperatures/",                 difficulty: "Medium", tag: "Monotonic Stack"   },
      { name: "Next Greater Element II",        link: "https://leetcode.com/problems/next-greater-element-ii/",            difficulty: "Medium", tag: "Monotonic Stack"   },
      { name: "Remove K Digits",                link: "https://leetcode.com/problems/remove-k-digits/",                    difficulty: "Medium", tag: "Monotonic Stack"   },
      { name: "Asteroid Collision",             link: "https://leetcode.com/problems/asteroid-collision/",                 difficulty: "Medium", tag: "Stack"             },
      { name: "Decode String",                  link: "https://leetcode.com/problems/decode-string/",                      difficulty: "Medium", tag: "Stack"             },
      { name: "Largest Rectangle in Histogram", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/",     difficulty: "Hard",   tag: "Monotonic Stack"   },
      { name: "Trapping Rain Water",            link: "https://leetcode.com/problems/trapping-rain-water/",                difficulty: "Hard",   tag: "Stack/Two Ptr"     },
      { name: "Maximal Rectangle",              link: "https://leetcode.com/problems/maximal-rectangle/",                  difficulty: "Hard",   tag: "Monotonic Stack"   },
    ],
  },
  {
    stage: 7, phase: "intermediate",
    title: "Binary Search — All Variants",
    subtitle: "Search space reduction — far beyond sorted arrays",
    color: T.phases.intermediate.color, accent: T.phases.intermediate.glow,
    concepts: [
      "Classic: lo, hi, mid = lo+(hi-lo)/2 (overflow-safe)",
      "Left-boundary binary search template",
      "Right-boundary binary search template",
      "Binary search on answer — feasibility predicate",
      "Monotonic predicate: if f(mid) then search left else right",
      "Rotated sorted array — finding the pivot",
      "Binary search on 2D matrix (treat as 1D)",
      "Floating-point binary search with epsilon",
      "Exponential search for unbounded arrays",
      "sort.Search() — Go stdlib implementation",
      "sort.SearchInts / sort.SearchStrings convenience",
      "Ternary search for strictly unimodal functions",
    ],
    learn: [
      "Memorize: both left-bound and right-bound templates cold",
      "Code: Implement sort.Search from scratch",
      "Code: Find square root using binary search on answer",
      "Code: Minimize maximum — classic search-on-answer",
      "Study: lc.discuss — Binary Search article by @zhijun_liu",
    ],
    practice: [
      { name: "Binary Search",                    link: "https://leetcode.com/problems/binary-search/",                                      difficulty: "Easy",   tag: "Classic"          },
      { name: "Search Insert Position",           link: "https://leetcode.com/problems/search-insert-position/",                             difficulty: "Easy",   tag: "Left Bound"       },
      { name: "First Bad Version",                link: "https://leetcode.com/problems/first-bad-version/",                                  difficulty: "Easy",   tag: "Left Bound"       },
      { name: "Search a 2D Matrix",               link: "https://leetcode.com/problems/search-a-2d-matrix/",                                 difficulty: "Medium", tag: "2D Binary Search" },
      { name: "Find Min in Rotated Sorted Array", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",             difficulty: "Medium", tag: "Rotated"          },
      { name: "Search in Rotated Sorted Array",   link: "https://leetcode.com/problems/search-in-rotated-sorted-array/",                     difficulty: "Medium", tag: "Rotated"          },
      { name: "Koko Eating Bananas",              link: "https://leetcode.com/problems/koko-eating-bananas/",                                difficulty: "Medium", tag: "Search on Answer" },
      { name: "Capacity to Ship Packages",        link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/",          difficulty: "Medium", tag: "Search on Answer" },
      { name: "Split Array Largest Sum",          link: "https://leetcode.com/problems/split-array-largest-sum/",                            difficulty: "Hard",   tag: "Search on Answer" },
      { name: "Median of Two Sorted Arrays",      link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",                        difficulty: "Hard",   tag: "Advanced"         },
    ],
  },
  {
    stage: 8, phase: "intermediate",
    title: "Linked Lists — Complete Mastery",
    subtitle: "Pointer manipulation — the foundation of Go internals",
    color: T.phases.intermediate.color, accent: T.phases.intermediate.glow,
    concepts: [
      "Singly linked list node struct in Go",
      "Doubly linked list full implementation",
      "Dummy/sentinel head node — eliminates edge cases",
      "Traversal, insert at head / tail / position",
      "Deletion by value, by position, from end",
      "Fast & slow pointer (Floyd's) — cycle detection",
      "Finding cycle entry point — Floyd's phase 2",
      "In-place reversal — iterative template",
      "In-place reversal — recursive (stack unwinding)",
      "Reversing sublist between positions L and R",
      "Merging two sorted linked lists (iterative + recursive)",
      "K-group reversal — recognize recursive subproblem",
      "Finding intersection of two linked lists",
      "Deep copy with random pointer — hash map approach",
      "Sort linked list — merge sort O(n log n) O(1) space",
      "Palindrome linked list — fast/slow + reverse",
    ],
    learn: [
      "Code: Implement doubly linked list with all operations",
      "Code: LinkedList-based LRU cache from scratch",
      "Draw: Pointer diagrams for every reversal step",
      "Code: Merge sort on linked list without extra space",
      "Study: Why fast/slow pointer works (mathematical proof)",
    ],
    practice: [
      { name: "Reverse Linked List",         link: "https://leetcode.com/problems/reverse-linked-list/",              difficulty: "Easy",   tag: "Reversal"     },
      { name: "Merge Two Sorted Lists",      link: "https://leetcode.com/problems/merge-two-sorted-lists/",           difficulty: "Easy",   tag: "Merge"        },
      { name: "Linked List Cycle",           link: "https://leetcode.com/problems/linked-list-cycle/",                difficulty: "Easy",   tag: "Fast/Slow"    },
      { name: "Middle of Linked List",       link: "https://leetcode.com/problems/middle-of-the-linked-list/",        difficulty: "Easy",   tag: "Fast/Slow"    },
      { name: "Remove Nth Node From End",    link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", difficulty: "Medium", tag: "Two Pointers" },
      { name: "Linked List Cycle II",        link: "https://leetcode.com/problems/linked-list-cycle-ii/",             difficulty: "Medium", tag: "Floyd's"      },
      { name: "Reorder List",                link: "https://leetcode.com/problems/reorder-list/",                     difficulty: "Medium", tag: "Reversal"     },
      { name: "Copy List with Random Pointer", link: "https://leetcode.com/problems/copy-list-with-random-pointer/",  difficulty: "Medium", tag: "Deep Copy"    },
      { name: "Sort List",                   link: "https://leetcode.com/problems/sort-list/",                        difficulty: "Medium", tag: "Merge Sort"   },
      { name: "Reverse Nodes in k-Group",    link: "https://leetcode.com/problems/reverse-nodes-in-k-group/",         difficulty: "Hard",   tag: "K-Reversal"   },
      { name: "Merge K Sorted Lists",        link: "https://leetcode.com/problems/merge-k-sorted-lists/",             difficulty: "Hard",   tag: "Heap+Merge"   },
    ],
  },
  {
    stage: 9, phase: "intermediate",
    title: "Trees, BST & Tries",
    subtitle: "Recursive thinking — most common interview category",
    color: T.phases.intermediate.color, accent: T.phases.intermediate.glow,
    concepts: [
      "Binary tree node struct in Go",
      "N-ary tree: children [](*Node) representation",
      "Recursive DFS: preorder / inorder / postorder",
      "Iterative preorder with explicit stack",
      "Iterative inorder — Morris traversal O(1) space",
      "BFS level-order: queue of []*TreeNode",
      "Zigzag / reverse level-order traversal",
      "Tree height, diameter, balance check O(n)",
      "BST: insert, delete (3 cases), search — iterative",
      "BST inorder = sorted sequence (key BST insight)",
      "Validate BST with min/max boundary propagation",
      "Lowest Common Ancestor — general + BST variant",
      "Path sum: root-to-leaf, any path, path count",
      "Serialize and deserialize binary tree",
      "Trie node struct, insert, search, startsWith",
      "Trie deletion and prefix counting",
      "Segment tree: build, point update, range query",
      "Binary Indexed Tree (Fenwick Tree)",
    ],
    learn: [
      "Code: Implement Trie with all 3 operations from scratch",
      "Code: Iterative inorder without Morris (practice both)",
      "Code: Segment tree supporting range sum + point update",
      "Study: Why BST + inorder gives sorted output",
      "Draw: LCA algorithm on a 10-node tree by hand",
    ],
    practice: [
      { name: "Invert Binary Tree",           link: "https://leetcode.com/problems/invert-binary-tree/",                                      difficulty: "Easy",   tag: "DFS"        },
      { name: "Maximum Depth of BT",          link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",                            difficulty: "Easy",   tag: "DFS"        },
      { name: "Subtree of Another Tree",      link: "https://leetcode.com/problems/subtree-of-another-tree/",                                 difficulty: "Easy",   tag: "DFS"        },
      { name: "Level Order Traversal",        link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",                       difficulty: "Medium", tag: "BFS"        },
      { name: "Validate BST",                 link: "https://leetcode.com/problems/validate-binary-search-tree/",                             difficulty: "Medium", tag: "BST"        },
      { name: "Kth Smallest in BST",          link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",                           difficulty: "Medium", tag: "BST"        },
      { name: "Lowest Common Ancestor",       link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",                 difficulty: "Medium", tag: "LCA"        },
      { name: "Construct BT Preorder+Inorder",  link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",difficulty: "Medium", tag: "Tree Build" },
      { name: "Implement Trie",               link: "https://leetcode.com/problems/implement-trie-prefix-tree/",                              difficulty: "Medium", tag: "Trie"       },
      { name: "Word Search II",               link: "https://leetcode.com/problems/word-search-ii/",                                          difficulty: "Hard",   tag: "Trie+DFS"   },
      { name: "Binary Tree Max Path Sum",     link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/",                            difficulty: "Hard",   tag: "DFS"        },
      { name: "Serialize/Deserialize BT",     link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",                   difficulty: "Hard",   tag: "Design"     },
    ],
  },

  /* ═══════════════════════ ADVANCED ═══════════════════════ */
  {
    stage: 10, phase: "advanced",
    title: "Graphs — Full Coverage",
    subtitle: "DFS, BFS, Topo, Union-Find, Shortest Paths, MST",
    color: T.phases.advanced.color, accent: T.phases.advanced.glow,
    concepts: [
      "Adjacency list: map[int][]int in Go",
      "Adjacency matrix for dense graphs",
      "DFS on graph — visited map[int]bool template",
      "BFS on graph — queue + visited map template",
      "Connected components — iterative DFS/BFS",
      "Bipartite graph check (2-coloring with BFS)",
      "Topological sort — DFS reverse post-order",
      "Topological sort — Kahn's BFS (indegree array)",
      "Cycle detection in directed graph (DFS + state)",
      "Cycle detection in undirected graph",
      "Union-Find (DSU): path compression + union by rank",
      "DSU: find with path compression template",
      "Dijkstra's: heap-based O((V+E) log V)",
      "Bellman-Ford: negative edges, O(VE)",
      "Floyd-Warshall: all-pairs O(V³)",
      "Prim's MST: heap-based greedy",
      "Kruskal's MST: sort edges + union-find",
      "Strongly Connected Components — Kosaraju's",
      "Tarjan's algorithm — SCC + articulation points + bridges",
      "Multi-source BFS (multiple starting nodes simultaneously)",
    ],
    learn: [
      "Code: Implement DSU with path compression + rank",
      "Code: Dijkstra's using Go container/heap",
      "Code: Kahn's topological sort with cycle detection",
      "Study: When Dijkstra fails (negative edges → Bellman-Ford)",
      "Code: Multi-source BFS for 0-1 matrix distance",
    ],
    practice: [
      { name: "Number of Islands",              link: "https://leetcode.com/problems/number-of-islands/",                          difficulty: "Medium", tag: "DFS/BFS"        },
      { name: "Clone Graph",                    link: "https://leetcode.com/problems/clone-graph/",                                difficulty: "Medium", tag: "DFS"            },
      { name: "Course Schedule",                link: "https://leetcode.com/problems/course-schedule/",                            difficulty: "Medium", tag: "Topo Sort"      },
      { name: "Course Schedule II",             link: "https://leetcode.com/problems/course-schedule-ii/",                         difficulty: "Medium", tag: "Topo Sort"      },
      { name: "Pacific Atlantic Water Flow",    link: "https://leetcode.com/problems/pacific-atlantic-water-flow/",                difficulty: "Medium", tag: "Multi-BFS"      },
      { name: "Redundant Connection",           link: "https://leetcode.com/problems/redundant-connection/",                       difficulty: "Medium", tag: "Union-Find"     },
      { name: "Network Delay Time",             link: "https://leetcode.com/problems/network-delay-time/",                         difficulty: "Medium", tag: "Dijkstra"       },
      { name: "Cheapest Flights Within K Stops",link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/",            difficulty: "Medium", tag: "Bellman-Ford"   },
      { name: "Min Cost to Connect Points",     link: "https://leetcode.com/problems/min-cost-to-connect-all-points/",             difficulty: "Medium", tag: "Prim/Kruskal"   },
      { name: "Word Ladder",                    link: "https://leetcode.com/problems/word-ladder/",                                difficulty: "Hard",   tag: "BFS"            },
      { name: "Alien Dictionary",               link: "https://leetcode.com/problems/alien-dictionary/",                           difficulty: "Hard",   tag: "Topo Sort"      },
      { name: "Critical Connections",           link: "https://leetcode.com/problems/critical-connections-in-a-network/",          difficulty: "Hard",   tag: "Tarjan"         },
    ],
  },
  {
    stage: 11, phase: "advanced",
    title: "Heap & Priority Queue",
    subtitle: "container/heap — Go's interface-based heap in full",
    color: T.phases.advanced.color, accent: T.phases.advanced.glow,
    concepts: [
      "Go container/heap interface: Len, Less, Swap, Push, Pop",
      "Min-heap full implementation from scratch",
      "Max-heap — flip the Less comparison",
      "Heap of custom structs with priority field",
      "heap.Init() — heapify existing slice O(n)",
      "heap.Push / heap.Pop — O(log n) each",
      "Top-K pattern — maintain min-heap of size K",
      "K-way merge — heap of (value, listIdx, elemIdx)",
      "Two-heap median pattern (max-heap + min-heap)",
      "Lazy deletion — mark invalid, skip on pop",
      "Heap-based task scheduling with cooldown",
      "Dijkstra's full implementation using Go heap",
    ],
    learn: [
      "Code: Implement heap.Interface for 3 different types",
      "Code: Top-K frequent words with custom comparator",
      "Code: K-way merge of sorted arrays using heap",
      "Code: Two-heap structure maintaining balance invariant",
      "Study: Why heap.Push wraps vs direct append",
    ],
    practice: [
      { name: "Kth Largest Element in Array", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/",            difficulty: "Medium", tag: "Min-Heap"    },
      { name: "Top K Frequent Elements",      link: "https://leetcode.com/problems/top-k-frequent-elements/",                    difficulty: "Medium", tag: "Heap"        },
      { name: "K Closest Points to Origin",   link: "https://leetcode.com/problems/k-closest-points-to-origin/",                 difficulty: "Medium", tag: "Heap"        },
      { name: "Task Scheduler",               link: "https://leetcode.com/problems/task-scheduler/",                             difficulty: "Medium", tag: "Max-Heap"    },
      { name: "Reorganize String",            link: "https://leetcode.com/problems/reorganize-string/",                          difficulty: "Medium", tag: "Max-Heap"    },
      { name: "Design Twitter",               link: "https://leetcode.com/problems/design-twitter/",                             difficulty: "Medium", tag: "Heap+Design" },
      { name: "Find Median from Data Stream", link: "https://leetcode.com/problems/find-median-from-data-stream/",               difficulty: "Hard",   tag: "Two Heaps"   },
      { name: "Smallest Range from K Lists",  link: "https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/",difficulty: "Hard", tag: "K-Way Heap" },
    ],
  },
  {
    stage: 12, phase: "advanced",
    title: "Dynamic Programming — All Patterns",
    subtitle: "Systematic breakdown of the hardest interview category",
    color: T.phases.advanced.color, accent: T.phases.advanced.glow,
    concepts: [
      "Memoization (top-down): map[string]int or dp[n]int with -1",
      "Tabulation (bottom-up): 1D and 2D dp arrays",
      "State space reduction — rolling array O(n)→O(1) space",
      "1D DP: Fibonacci, Climbing Stairs, House Robber",
      "2D DP: Unique Paths, Edit Distance, LCS",
      "0/1 Knapsack — dp[i][w] fill direction",
      "Unbounded Knapsack — Coin Change fill direction",
      "Longest Common Subsequence (LCS) — full reconstruction",
      "Longest Increasing Subsequence O(n²) and O(n log n) patience sort",
      "Longest Palindromic Subsequence / Substring",
      "Interval DP — dp[l][r] with increasing length",
      "Tree DP — solve at each node, combine children results",
      "Digit DP — count integers in [0,N] satisfying constraint",
      "Bitmask DP — dp[mask] for subset enumeration",
      "DP on graphs — shortest path with states",
      "Probability DP and expected value computation",
      "Matrix chain multiplication — classic interval DP",
      "DP with monotonic deque for O(n) state transitions",
    ],
    learn: [
      "Study: Identify DP by: optimal substructure + overlapping subproblems",
      "Code: Solve Coin Change both top-down and bottom-up",
      "Code: Reconstruct actual LCS string, not just length",
      "Code: LIS in O(n log n) using patience sorting",
      "Code: Bitmask DP — Travelling Salesman on 15 nodes",
    ],
    practice: [
      { name: "Climbing Stairs",               link: "https://leetcode.com/problems/climbing-stairs/",                          difficulty: "Easy",   tag: "1D DP"              },
      { name: "House Robber",                  link: "https://leetcode.com/problems/house-robber/",                             difficulty: "Medium", tag: "1D DP"              },
      { name: "House Robber II",               link: "https://leetcode.com/problems/house-robber-ii/",                          difficulty: "Medium", tag: "1D DP"              },
      { name: "Coin Change",                   link: "https://leetcode.com/problems/coin-change/",                              difficulty: "Medium", tag: "Unbounded Knapsack" },
      { name: "Longest Common Subsequence",    link: "https://leetcode.com/problems/longest-common-subsequence/",               difficulty: "Medium", tag: "2D DP"              },
      { name: "Longest Increasing Subsequence",link: "https://leetcode.com/problems/longest-increasing-subsequence/",           difficulty: "Medium", tag: "LIS"                },
      { name: "Unique Paths",                  link: "https://leetcode.com/problems/unique-paths/",                             difficulty: "Medium", tag: "2D DP"              },
      { name: "Word Break",                    link: "https://leetcode.com/problems/word-break/",                               difficulty: "Medium", tag: "DP"                 },
      { name: "Edit Distance",                 link: "https://leetcode.com/problems/edit-distance/",                            difficulty: "Medium", tag: "2D DP"              },
      { name: "Partition Equal Subset Sum",    link: "https://leetcode.com/problems/partition-equal-subset-sum/",               difficulty: "Medium", tag: "0/1 Knapsack"       },
      { name: "Decode Ways",                   link: "https://leetcode.com/problems/decode-ways/",                              difficulty: "Medium", tag: "1D DP"              },
      { name: "Burst Balloons",                link: "https://leetcode.com/problems/burst-balloons/",                           difficulty: "Hard",   tag: "Interval DP"        },
      { name: "Regular Expression Matching",   link: "https://leetcode.com/problems/regular-expression-matching/",              difficulty: "Hard",   tag: "2D DP"              },
      { name: "Distinct Subsequences",         link: "https://leetcode.com/problems/distinct-subsequences/",                    difficulty: "Hard",   tag: "2D DP"              },
      { name: "Longest Valid Parentheses",     link: "https://leetcode.com/problems/longest-valid-parentheses/",                difficulty: "Hard",   tag: "Stack/DP"           },
    ],
  },
  {
    stage: 13, phase: "advanced",
    title: "Backtracking & Recursion",
    subtitle: "Decision trees — generate all valid states efficiently",
    color: T.phases.advanced.color, accent: T.phases.advanced.glow,
    concepts: [
      "Backtracking template: choose → explore → unchoose",
      "State space tree — visualize before coding",
      "Pruning — cutting branches before recursing",
      "Permutations without duplicates — swap approach",
      "Permutations with duplicates — sort + skip",
      "Combinations nCr — start index prevents reuse",
      "Combination sum — allow reuse (unbounded)",
      "Combination sum II — no reuse, skip duplicates",
      "Subsets (power set) — include/exclude pattern",
      "Subsets II — sort + deduplicate",
      "N-Queens — row/col/diagonal constraint tracking",
      "Sudoku solver — box constraint: (r/3)*3 + c/3",
      "Word search on 2D grid — visited marking + unmark",
      "Generate valid parentheses — open/close count tracking",
      "Palindrome partitioning — precompute isPalin[l][r]",
      "Letter combinations of phone number",
    ],
    learn: [
      "Code: All 3 subset templates and understand the difference",
      "Code: N-Queens with bit manipulation for O(1) constraint check",
      "Code: Sudoku solver with constraint propagation",
      "Study: Time complexity of backtracking (decision tree analysis)",
      "Practice: Explain pruning rationale out loud for each problem",
    ],
    practice: [
      { name: "Subsets",                           link: "https://leetcode.com/problems/subsets/",                               difficulty: "Medium", tag: "Backtrack" },
      { name: "Subsets II",                        link: "https://leetcode.com/problems/subsets-ii/",                            difficulty: "Medium", tag: "Backtrack" },
      { name: "Permutations",                      link: "https://leetcode.com/problems/permutations/",                          difficulty: "Medium", tag: "Backtrack" },
      { name: "Combination Sum",                   link: "https://leetcode.com/problems/combination-sum/",                       difficulty: "Medium", tag: "Backtrack" },
      { name: "Combination Sum II",                link: "https://leetcode.com/problems/combination-sum-ii/",                    difficulty: "Medium", tag: "Backtrack" },
      { name: "Generate Parentheses",              link: "https://leetcode.com/problems/generate-parentheses/",                  difficulty: "Medium", tag: "Backtrack" },
      { name: "Letter Combinations Phone Number",  link: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/", difficulty: "Medium", tag: "Backtrack" },
      { name: "Palindrome Partitioning",           link: "https://leetcode.com/problems/palindrome-partitioning/",               difficulty: "Medium", tag: "Backtrack" },
      { name: "Word Search",                       link: "https://leetcode.com/problems/word-search/",                           difficulty: "Medium", tag: "Backtrack" },
      { name: "N-Queens",                          link: "https://leetcode.com/problems/n-queens/",                              difficulty: "Hard",   tag: "Backtrack" },
      { name: "Sudoku Solver",                     link: "https://leetcode.com/problems/sudoku-solver/",                         difficulty: "Hard",   tag: "Backtrack" },
    ],
  },
  {
    stage: 14, phase: "advanced",
    title: "Go Concurrency — Deep Mastery",
    subtitle: "Goroutines, channels, sync primitives — what makes Go unique",
    color: T.phases.advanced.color, accent: T.phases.advanced.glow,
    concepts: [
      "Goroutines — M:N scheduling model, GOMAXPROCS",
      "go keyword — spawning goroutines, stack size growth",
      "Unbuffered channels — rendezvous / synchronization",
      "Buffered channels — async send up to cap, backpressure",
      "Directional channels: chan<-T (send-only), <-chan T (receive-only)",
      "select statement — multiplexing on channels",
      "select with default — non-blocking channel operations",
      "Done channel pattern for cooperative cancellation",
      "context.Context — WithCancel, WithTimeout, WithDeadline",
      "context.Value — request-scoped data (use sparingly)",
      "sync.Mutex and sync.RWMutex — lock granularity",
      "sync.WaitGroup — coordinate goroutine lifecycle",
      "sync.Once — singleton initialization, lazy loading",
      "sync.Cond — condition variables for complex signaling",
      "sync.Map — concurrent map (read-heavy workloads only)",
      "sync/atomic — lock-free: Add, Load, Store, CompareAndSwap",
      "Worker pool pattern — bounded goroutines with job channel",
      "Fan-out / fan-in pipeline pattern",
      "Rate limiting — time.Ticker + token bucket",
      "errgroup.Group — parallel goroutines with error collection",
      "Race detector: go test -race — always run in CI",
      "Goroutine leak detection — never start goroutine without exit path",
      "Deadlock: all goroutines asleep — causes and prevention",
      "Memory model: happens-before guarantees in Go",
    ],
    learn: [
      "Code: Worker pool processing 1000 jobs with 10 workers",
      "Code: Pipeline: generate → transform → sink stages",
      "Code: Context cancellation propagated through 3-deep call chain",
      "Read: go.dev/ref/mem — Go Memory Model",
      "Code: Concurrent map with read-write lock, benchmark vs sync.Map",
    ],
    practice: [
      { name: "Web Crawler (Multithreaded)", link: "https://leetcode.com/problems/web-crawler-multithreaded/",  difficulty: "Medium", tag: "Goroutines" },
      { name: "Print in Order",              link: "https://leetcode.com/problems/print-in-order/",             difficulty: "Easy",   tag: "Sync"       },
      { name: "Print FooBar Alternately",    link: "https://leetcode.com/problems/print-foobar-alternately/",   difficulty: "Medium", tag: "Channels"   },
      { name: "FizzBuzz Multithreaded",      link: "https://leetcode.com/problems/fizz-buzz-multithreaded/",    difficulty: "Medium", tag: "Channels"   },
      { name: "Building H2O",                link: "https://leetcode.com/problems/building-h2o/",               difficulty: "Medium", tag: "Sync"       },
      { name: "Dining Philosophers",         link: "https://leetcode.com/problems/the-dining-philosophers/",    difficulty: "Medium", tag: "Mutex"      },
      { name: "Design Bounded Blocking Queue",link: "https://leetcode.com/problems/design-bounded-blocking-queue/",difficulty: "Medium",tag: "Channel"   },
    ],
  },

  /* ═══════════════════════ PROFESSIONAL ═══════════════════════ */
  {
    stage: 15, phase: "professional",
    title: "Testing — Production Grade",
    subtitle: "Go testing is a superpower — use every feature",
    color: T.phases.professional.color, accent: T.phases.professional.glow,
    concepts: [
      "_test.go naming convention and package _test suffix",
      "func TestXxx(t *testing.T) — basic test structure",
      "t.Run() — subtests for grouping and filtering",
      "t.Parallel() — parallel test execution",
      "t.Helper() — correct failure line attribution",
      "t.Cleanup() — deferred teardown in tests",
      "t.TempDir() — auto-cleaned temporary directory",
      "t.Setenv() — isolated environment variable testing",
      "Table-driven tests: []struct{ name, input, want }",
      "Benchmarks: func BenchmarkXxx(b *testing.B)",
      "b.ReportAllocs() and b.SetBytes(n) for allocation tracking",
      "go test -bench=. -benchmem -count=5 -cpuprofile",
      "benchstat for statistical benchmark comparison",
      "Fuzz testing: func FuzzXxx(f *testing.F) — Go 1.18+",
      "f.Add() seed corpus, f.Fuzz(t, ...) target function",
      "go test -fuzz=FuzzXxx -fuzztime=30s",
      "Example functions — testable, appear in godoc",
      "TestMain(m *testing.M) — global setup and teardown",
      "Integration tests with build tags: //go:build integration",
      "httptest.NewRecorder — capture handler response",
      "httptest.NewServer — full HTTP server for client tests",
      "Mocking with interfaces — no library required",
      "testify/assert (non-fatal) vs testify/require (fatal)",
      "testify/mock — expectation-based mock generation",
      "mockery — generate mocks from interface definitions",
      "Golden file testing — compare output to .golden files",
      "testcontainers-go — real DB/Redis/Kafka in tests",
      "go test -cover -coverprofile=cov.out then go tool cover -html",
    ],
    learn: [
      "Code: Write table-driven tests for a JSON parser",
      "Code: Benchmark 3 sorting implementations with benchstat",
      "Code: Fuzz test a URL parser — find crashes automatically",
      "Code: Integration test with real PostgreSQL via testcontainers",
      "Code: Mock HTTP API client — 100% test coverage",
    ],
    practice: [
      { name: "Table-test: Two Sum (3 approaches)",        link: "https://leetcode.com/problems/two-sum/",             difficulty: "Easy",   tag: "Table Tests"   },
      { name: "Benchmark: sort algorithms comparison",     link: "https://leetcode.com/problems/sort-an-array/",       difficulty: "Medium", tag: "Benchmarks"    },
      { name: "Fuzz: reverse string edge cases",           link: "https://leetcode.com/problems/reverse-string/",      difficulty: "Easy",   tag: "Fuzz"          },
      { name: "Mock: HTTP web crawler client",             link: "https://leetcode.com/problems/web-crawler/",         difficulty: "Medium", tag: "Mocking"       },
      { name: "Integration: LRU with real Redis",          link: "https://leetcode.com/problems/lru-cache/",           difficulty: "Medium", tag: "Integration"   },
    ],
  },
  {
    stage: 16, phase: "professional",
    title: "Go Internals & Performance",
    subtitle: "Understand the runtime — write code that's measurably fast",
    color: T.phases.professional.color, accent: T.phases.professional.glow,
    concepts: [
      "Go runtime: goroutine scheduler (GMP model)",
      "Garbage collector: tri-color mark-and-sweep",
      "GC pauses — GOGC, GOMEMLIMIT tuning",
      "Escape analysis: stack vs heap allocation decision",
      "go build -gcflags='-m' to see escape decisions",
      "Struct field alignment — padding and memory layout",
      "False sharing — cache line awareness in concurrent code",
      "sync.Pool — object reuse to reduce GC pressure",
      "strings.Builder vs bytes.Buffer vs []byte performance",
      "Avoiding []byte ↔ string conversions (unsafe trick)",
      "io.Reader streaming vs reading all into memory",
      "Profiling: go tool pprof -http=:8080 cpu.prof",
      "Memory profiling: go test -memprofile=mem.prof",
      "Execution tracer: go tool trace trace.out",
      "runtime/debug.SetGCPercent and SetMemoryLimit",
      "Inlining: small functions auto-inlined, //go:noinline",
      "reflect package — cost model, when to avoid",
      "unsafe.Pointer — layout tricks (use with extreme care)",
      "cgo — calling C code, latency implications",
      "SIMD via assembly — when Go's compiler can't auto-vectorize",
    ],
    learn: [
      "Run: escape analysis on 5 common patterns — understand output",
      "Code: Benchmark sync.Pool vs fresh allocation under load",
      "Profile: pprof a real HTTP server — identify hot path",
      "Study: GMP scheduler deep dive — Dmitry Vyukov's talks",
      "Code: Zero-allocation string builder using unsafe",
    ],
    practice: [
      { name: "Benchmark: Two Sum map vs sort variants",  link: "https://leetcode.com/problems/two-sum/",                                      difficulty: "Easy",   tag: "Profiling"  },
      { name: "Zero-alloc: contains duplicate",           link: "https://leetcode.com/problems/contains-duplicate/",                           difficulty: "Easy",   tag: "Memory"     },
      { name: "Pool: LRU allocation reduction",           link: "https://leetcode.com/problems/lru-cache/",                                    difficulty: "Medium", tag: "sync.Pool"  },
      { name: "Stream: process large file lazily",        link: "https://leetcode.com/problems/read-n-characters-given-read4/",                difficulty: "Easy",   tag: "io.Reader"  },
    ],
  },
  {
    stage: 17, phase: "professional",
    title: "System Design in Go",
    subtitle: "Production systems: APIs, queues, distributed patterns",
    color: T.phases.professional.color, accent: T.phases.professional.glow,
    concepts: [
      "net/http server: ServeMux, Handler, HandlerFunc",
      "Go 1.22+ enhanced router: method+path parameters",
      "Middleware chain pattern: func(Handler) Handler",
      "Request context propagation and cancellation",
      "Graceful shutdown: os.Signal + http.Server.Shutdown",
      "Chi / Echo / Gin — tradeoffs and when to use each",
      "encoding/json streaming: json.Encoder / json.Decoder",
      "Input validation patterns (validate struct tags)",
      "JWT authentication middleware implementation",
      "database/sql: connection pool config, context deadlines",
      "pgx — PostgreSQL native driver, pgxpool",
      "sqlc — type-safe query generation from .sql files",
      "sqlx — struct scanning, named queries",
      "Database migrations: goose or golang-migrate",
      "Repository pattern — testable data access layer",
      "Redis with go-redis: caching, pub/sub, distributed locks",
      "gRPC + protobuf: service definition, server, interceptors",
      "grpc-gateway — REST ↔ gRPC transcoding bridge",
      "NATS / Kafka with Go clients — message queues",
      "log/slog — structured logging (Go 1.21+)",
      "Prometheus metrics: prometheus/client_golang + promhttp",
      "OpenTelemetry: distributed traces + spans",
      "Multi-stage Docker build for minimal Go image",
      "Distroless / scratch base images",
      "Health endpoints: /healthz (liveness) /readyz (readiness)",
      "Token bucket rate limiter implementation",
      "Circuit breaker pattern with state machine",
      "Retry with jitter — exponential backoff",
    ],
    learn: [
      "Code: Full REST API — auth, middleware, DB, graceful shutdown",
      "Code: gRPC service with streaming and interceptors",
      "Code: Redis-backed distributed rate limiter",
      "Code: Database repository with full mock for 100% test coverage",
      "Read: github.com/golang-standards/project-layout",
    ],
    practice: [
      { name: "Design Key-Value Store",         link: "https://leetcode.com/problems/design-a-key-value-store/",             difficulty: "Medium", tag: "System Design" },
      { name: "Design Hit Counter",             link: "https://leetcode.com/problems/design-hit-counter/",                   difficulty: "Medium", tag: "Rate Limiting" },
      { name: "Design MRU Queue",               link: "https://leetcode.com/problems/design-most-recently-used-queue/",      difficulty: "Medium", tag: "System Design" },
      { name: "Design In-Memory File System",   link: "https://leetcode.com/problems/design-in-memory-file-system/",         difficulty: "Hard",   tag: "System Design" },
      { name: "Design Search Autocomplete",     link: "https://leetcode.com/problems/design-search-autocomplete-system/",    difficulty: "Hard",   tag: "Trie+Design"   },
      { name: "Design Log Storage System",      link: "https://leetcode.com/problems/design-log-storage-system/",            difficulty: "Medium", tag: "System Design" },
    ],
  },
  {
    stage: 18, phase: "professional",
    title: "Advanced Algorithms & Interview Mastery",
    subtitle: "Bit ops, math, string algorithms — close every gap",
    color: T.phases.professional.color, accent: T.phases.professional.glow,
    concepts: [
      "Bit manipulation: AND, OR, XOR, NOT, left/right shifts",
      "XOR identity: a^a=0, a^0=a — find single element",
      "bits.OnesCount / bits.Len / bits.TrailingZeros (math/bits)",
      "Power of 2: n&(n-1)==0, n>0",
      "Bitmask subset enumeration: for mask:=0; mask<(1<<n); mask++",
      "Math: GCD via Euclidean algorithm (iterative)",
      "LCM = a/GCD(a,b)*b (avoid overflow)",
      "Sieve of Eratosthenes — prime generation O(n log log n)",
      "Fast exponentiation (binary exponentiation) O(log n)",
      "Modular arithmetic: (a*b)%mod, (a+b)%mod",
      "Modular inverse: Fermat's little theorem",
      "String hashing — Rabin-Karp rolling hash",
      "KMP algorithm — failure function, O(n+m) matching",
      "Z-algorithm — Z-array pattern matching",
      "Manacher's — all palindromic substrings in O(n)",
      "Suffix array + LCP array construction",
      "Greedy — activity selection, interval scheduling",
      "Interval merging and sweep line technique",
      "Divide and conquer — master theorem analysis",
      "QuickSelect — O(n) avg k-th element",
      "Reservoir sampling — k items from stream in O(n)",
      "Randomized algorithms — expected complexity reasoning",
      "Amortized analysis — aggregate, potential, accounting",
      "Time/space complexity: Big-O, Θ, Ω — formal definitions",
      "FAANG interview framework: clarify → example → approach → code → test",
      "Mock interview: 45-min timed sessions minimum 3x/week",
    ],
    learn: [
      "Code: KMP implementation + test against brute force",
      "Code: Manacher's on 5 examples — verify O(n)",
      "Code: QuickSelect — median of medians variant",
      "Study: System design interviews — Designing Data-Intensive Applications",
      "Practice: 3 mock interviews on Pramp or interviewing.io",
    ],
    practice: [
      { name: "Single Number",                  link: "https://leetcode.com/problems/single-number/",                          difficulty: "Easy",   tag: "XOR"         },
      { name: "Number of 1 Bits",               link: "https://leetcode.com/problems/number-of-1-bits/",                       difficulty: "Easy",   tag: "Bits"        },
      { name: "Counting Bits",                  link: "https://leetcode.com/problems/counting-bits/",                          difficulty: "Easy",   tag: "Bits+DP"     },
      { name: "Reverse Bits",                   link: "https://leetcode.com/problems/reverse-bits/",                           difficulty: "Easy",   tag: "Bits"        },
      { name: "Missing Number",                 link: "https://leetcode.com/problems/missing-number/",                         difficulty: "Easy",   tag: "XOR/Math"    },
      { name: "Sum of Two Integers (no +)",     link: "https://leetcode.com/problems/sum-of-two-integers/",                    difficulty: "Medium", tag: "Bit Math"    },
      { name: "Find the Duplicate Number",      link: "https://leetcode.com/problems/find-the-duplicate-number/",              difficulty: "Medium", tag: "Floyd/Bits"  },
      { name: "Merge K Sorted Lists",           link: "https://leetcode.com/problems/merge-k-sorted-lists/",                   difficulty: "Hard",   tag: "Heap"        },
      { name: "Find Median from Data Stream",   link: "https://leetcode.com/problems/find-median-from-data-stream/",           difficulty: "Hard",   tag: "Two Heaps"   },
      { name: "Minimum Window Substring",       link: "https://leetcode.com/problems/minimum-window-substring/",               difficulty: "Hard",   tag: "Sliding Win" },
      { name: "Trapping Rain Water",            link: "https://leetcode.com/problems/trapping-rain-water/",                    difficulty: "Hard",   tag: "Multi-Pattern"},
      { name: "Median of Two Sorted Arrays",    link: "https://leetcode.com/problems/median-of-two-sorted-arrays/",            difficulty: "Hard",   tag: "Binary Search"},
    ],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const PHASE_ORDER: PhaseId[] = ["beginner", "intermediate", "advanced", "professional"];

function phaseOf(id: PhaseId): PhaseInfo { return T.phases[id]; }

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function GoProRoadmap() {
  const [concepts,   setConcepts]   = useState<Record<string, boolean>>({});
  const [learns,     setLearns]     = useState<Record<string, boolean>>({});
  const [probs,      setProbs]      = useState<Record<string, boolean>>({});
  const [openStage,  setOpenStage]  = useState<number | null>(1);
  const [stageTabs,  setStageTabs]  = useState<Record<number, TabType>>({});
  const [phaseFilter,setPhaseFilter]= useState<PhaseId | "all">("all");
  const [mainView,   setMainView]   = useState<ViewType>("roadmap");

  // Persist
  useEffect(() => {
    try {
      const c = localStorage.getItem("gp-c"); const l = localStorage.getItem("gp-l"); const p = localStorage.getItem("gp-p");
      if (c) setConcepts(JSON.parse(c) as Record<string, boolean>); 
      if (l) setLearns(JSON.parse(l) as Record<string, boolean>); 
      if (p) setProbs(JSON.parse(p) as Record<string, boolean>);
    } catch {}
  }, []);

  const save = useCallback((key: string, val: Record<string, boolean>) => { 
    try { localStorage.setItem(key, JSON.stringify(val)); } catch {} 
  }, []);

  const toggleC = useCallback((s: number, i: number) => setConcepts(prev => { const n={...prev,[`${s}-c-${i}`]:!prev[`${s}-c-${i}`]}; save("gp-c",n); return n; }), [save]);
  const toggleL = useCallback((s: number, i: number) => setLearns(prev => { const n={...prev,[`${s}-l-${i}`]:!prev[`${s}-l-${i}`]}; save("gp-l",n); return n; }), [save]);
  const toggleP = useCallback((s: number, i: number) => setProbs(prev => { const n={...prev,[`${s}-p-${i}`]:!prev[`${s}-p-${i}`]}; save("gp-p",n); return n; }), [save]);

  const stageStats = useCallback((st: Stage) => {
    const dc = st.concepts.filter((_,i) => concepts[`${st.stage}-c-${i}`]).length;
    const dl = st.learn.filter((_,i) => learns[`${st.stage}-l-${i}`]).length;
    const dp = st.practice.filter((_,i) => probs[`${st.stage}-p-${i}`]).length;
    const total = st.concepts.length + st.learn.length + st.practice.length;
    return { dc, dl, dp, tc: st.concepts.length, tl: st.learn.length, tp: st.practice.length, total, done: dc+dl+dp, pct: Math.round(((dc+dl+dp)/total)*100) };
  }, [concepts, learns, probs]);

  const totals = useMemo(() => {
    const allC = CURRICULUM.reduce((a,s)=>a+s.concepts.length,0);
    const allL = CURRICULUM.reduce((a,s)=>a+s.learn.length,0);
    const allP = CURRICULUM.reduce((a,s)=>a+s.practice.length,0);
    const doneC = CURRICULUM.reduce((a,s)=>a+stageStats(s).dc,0);
    const doneL = CURRICULUM.reduce((a,s)=>a+stageStats(s).dl,0);
    const doneP = CURRICULUM.reduce((a,s)=>a+stageStats(s).dp,0);
    const total = allC+allL+allP; const done = doneC+doneL+doneP;
    return { allC,allL,allP, doneC,doneL,doneP, total, done, pct: Math.round((done/total)*100) };
  }, [stageStats]);

  const isUnlocked = useCallback((_idx: number) => true, []);

  const visible = phaseFilter==="all" ? CURRICULUM : CURRICULUM.filter(s=>s.phase===phaseFilter);

  const phaseData = useMemo(() => PHASE_ORDER.map(pid => {
    // Renamed 'stages' to 'phaseStages' to prevent overwriting the string property
    const phaseStages = CURRICULUM.filter(s=>s.phase===pid);
    const done = phaseStages.reduce((a,s)=>a+stageStats(s).done,0);
    const total = phaseStages.reduce((a,s)=>a+stageStats(s).total,0);
    
    // Removed 'stages' from the return object so ...phaseOf(pid).stages (the string) is preserved
    return { id:pid, ...phaseOf(pid), done, total, pct: Math.round((done/total)*100) };
  }), [stageStats]);

  return (
    <div style={{ fontFamily:"'IBM Plex Mono','JetBrains Mono',monospace", background:T.bg, minHeight:"100vh", color:T.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Epilogue:wght@700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:9px}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
        .fi{animation:fadeIn .18s ease forwards}
        .hov-row:hover{background:rgba(255,255,255,0.03)!important}
        button{cursor:pointer;font-family:inherit}
        a{text-decoration:none}
      `}</style>

      {/* ══ STICKY HEADER ══ */}
      <header style={{ background:T.surface, borderBottom:`1px solid ${T.border}`, padding:"1.1rem 1.5rem", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ maxWidth:960, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem", flexWrap:"wrap", marginBottom:"1rem" }}>
            {/* Brand */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem" }}>
              <div style={{ width:36, height:36, borderRadius:8, background:`linear-gradient(135deg,${T.phases.beginner.color},${T.phases.professional.color})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.1rem", flexShrink:0 }}>⚡</div>
              <div>
                <div style={{ fontFamily:"'Epilogue',sans-serif", fontWeight:900, fontSize:"1.15rem", color:T.heading, letterSpacing:"-0.02em", lineHeight:1 }}>Go × DSA Roadmap</div>
                <div style={{ fontSize:"0.62rem", color:T.muted, letterSpacing:"0.1em", marginTop:"0.2rem" }}>BEGINNER → PROFESSIONAL · 18 STAGES</div>
              </div>
            </div>
            {/* Stats pill + view toggle */}
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:T.raised, border:`1px solid ${T.border}`, borderRadius:8, padding:"0.35rem 0.75rem" }}>
                <span style={{ fontFamily:"'Epilogue',sans-serif", fontWeight:800, fontSize:"1.1rem", color:T.heading }}>{totals.pct}%</span>
                <span style={{ fontSize:"0.62rem", color:T.subtle }}>{totals.done}/{totals.total}</span>
              </div>
              {(["roadmap","stats"] as ViewType[]).map(v=>(
                <button key={v} onClick={()=>setMainView(v)} style={{ padding:"0.35rem 0.7rem", borderRadius:7, border:mainView===v?`1px solid ${T.borderHi}`:`1px solid transparent`, background:mainView===v?T.raised:"transparent", color:mainView===v?T.strong:T.muted, fontSize:"0.68rem", letterSpacing:"0.06em" }}>
                  {v==="roadmap"?"📍 Roadmap":"📊 Stats"}
                </button>
              ))}
            </div>
          </div>

          {/* Master progress bar */}
          <div style={{ height:4, background:T.border, borderRadius:99, overflow:"hidden", marginBottom:"0.85rem" }}>
            <div style={{ height:"100%", width:`${totals.pct}%`, background:`linear-gradient(90deg,${T.phases.beginner.color},${T.phases.intermediate.color},${T.phases.advanced.color},${T.phases.professional.color})`, borderRadius:99, transition:"width .5s ease" }} />
          </div>

          {/* Phase filter pills */}
          <div style={{ display:"flex", gap:"0.35rem", flexWrap:"wrap" }}>
            <button onClick={()=>setPhaseFilter("all")} style={{ padding:"0.25rem 0.65rem", borderRadius:99, border:phaseFilter==="all"?`1px solid ${T.borderHi}`:`1px solid ${T.border}`, background:phaseFilter==="all"?T.raised:"transparent", color:phaseFilter==="all"?T.strong:T.subtle, fontSize:"0.65rem" }}>
              All
            </button>
            {phaseData.map(ph=>(
              <button key={ph.id} onClick={()=>setPhaseFilter(phaseFilter===ph.id?"all":ph.id)} style={{ padding:"0.25rem 0.65rem", borderRadius:99, border:phaseFilter===ph.id?`1px solid ${ph.color}50`:`1px solid ${T.border}`, background:phaseFilter===ph.id?ph.color+"18":"transparent", color:phaseFilter===ph.id?ph.color:T.subtle, fontSize:"0.65rem", display:"flex", alignItems:"center", gap:"0.35rem" }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:ph.color, display:"inline-block" }}/>
                {ph.label} <span style={{ opacity:0.65 }}>{ph.pct}%</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:960, margin:"0 auto", padding:"1.25rem 1.5rem 6rem" }}>

        {/* ══ STATS VIEW ══ */}
        {mainView==="stats" && (
          <div className="fi">
            {/* Summary cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:"0.6rem", marginBottom:"1.25rem" }}>
              {[
                {label:"Concepts",  done:totals.doneC, total:totals.allC,  color:"#58A6FF"},
                {label:"Tasks",     done:totals.doneL, total:totals.allL,  color:T.phases.intermediate.color},
                {label:"Problems",  done:totals.doneP, total:totals.allP,  color:T.phases.beginner.color},
                {label:"Progress",  done:totals.pct,   total:100, color:T.phases.professional.color, suffix:"%"},
              ].map(card=>(
                <div key={card.label} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:"0.9rem 1rem" }}>
                  <div style={{ fontSize:"1.6rem", fontFamily:"'Epilogue',sans-serif", fontWeight:800, color:card.color, lineHeight:1 }}>{card.done}{card.suffix||""}</div>
                  <div style={{ fontSize:"0.62rem", color:T.muted, marginTop:"0.2rem", letterSpacing:"0.08em" }}>{card.label}</div>
                  <div style={{ marginTop:"0.55rem", height:2, background:T.border, borderRadius:99, overflow:"hidden" }}>
                    <div style={{ height:"100%", width:`${Math.round((card.done/card.total)*100)}%`, background:card.color, borderRadius:99 }}/>
                  </div>
                  <div style={{ fontSize:"0.58rem", color:T.muted, marginTop:"0.3rem" }}>{card.done}/{card.total}</div>
                </div>
              ))}
            </div>

            {/* Phase breakdown */}
            <div style={{ marginBottom:"1.25rem" }}>
              <SectionLabel>Phase Breakdown</SectionLabel>
              <div style={{ display:"grid", gap:"0.45rem", marginTop:"0.6rem" }}>
                {phaseData.map(ph=>(
                  <div key={ph.id} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:10, padding:"0.85rem 1rem" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.55rem" }}>
                        <span style={{ width:7, height:7, borderRadius:"50%", background:ph.color, display:"inline-block" }}/>
                        <span style={{ fontSize:"0.8rem", color:T.strong, fontWeight:600 }}>{ph.label}</span>
                        <span style={{ fontSize:"0.6rem", color:T.muted }}>{ph.stages}</span>
                      </div>
                      <span style={{ fontSize:"0.78rem", fontWeight:700, color:ph.color }}>{ph.pct}%</span>
                    </div>
                    <div style={{ height:3, background:T.border, borderRadius:99, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${ph.pct}%`, background:ph.color, borderRadius:99, transition:"width .4s" }}/>
                    </div>
                    <div style={{ display:"flex", gap:"1rem", marginTop:"0.45rem" }}>
                      <span style={{ fontSize:"0.6rem", color:T.subtle }}>📖 {ph.stages.split("–")[0].trim()}-{ph.stages.split("–")[1]?.trim()||ph.stages} · {ph.done}/{ph.total} items</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage table */}
            <SectionLabel>All Stages</SectionLabel>
            <div style={{ display:"grid", gap:"0.3rem", marginTop:"0.6rem" }}>
              {CURRICULUM.map(st=>{
                const ss=stageStats(st); const ph=phaseOf(st.phase);
                return (
                  <div key={st.stage} style={{ display:"flex", alignItems:"center", gap:"0.65rem", background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, padding:"0.55rem 0.85rem" }}>
                    <span style={{ fontSize:"0.62rem", color:T.muted, minWidth:"1.5rem" }}>#{st.stage}</span>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:ph.color, flexShrink:0 }}/>
                    <span style={{ fontSize:"0.73rem", color:T.body, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{st.title}</span>
                    <span style={{ fontSize:"0.6rem", color:T.muted, whiteSpace:"nowrap" }}>{ss.dc}/{ss.tc}c · {ss.dl}/{ss.tl}t · {ss.dp}/{ss.tp}p</span>
                    <div style={{ width:56, height:3, background:T.border, borderRadius:99, overflow:"hidden", flexShrink:0 }}>
                      <div style={{ height:"100%", width:`${ss.pct}%`, background:ph.color, borderRadius:99 }}/>
                    </div>
                    <span style={{ fontSize:"0.65rem", fontWeight:700, color:ss.pct>0?ph.color:T.muted, minWidth:"2.2rem", textAlign:"right" }}>{ss.pct}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══ ROADMAP VIEW ══ */}
        {mainView==="roadmap" && (
          <div>
            {PHASE_ORDER.filter(pid=>phaseFilter==="all"||phaseFilter===pid).map(pid=>{
              const ph = phaseOf(pid);
              const stages = visible.filter(s=>s.phase===pid);
              if(!stages.length) return null;
              const pd = phaseData.find(p=>p.id===pid);

              return (
                <div key={pid} style={{ marginBottom:"1.75rem" }}>
                  {/* Phase header */}
                  <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.75rem", paddingBottom:"0.6rem", borderBottom:`1px solid ${ph.color}22` }}>
                    <span style={{ width:9, height:9, borderRadius:"50%", background:ph.color, display:"inline-block", boxShadow:`0 0 10px ${ph.color}60` }}/>
                    <span style={{ fontFamily:"'Epilogue',sans-serif", fontWeight:800, fontSize:"0.88rem", color:ph.color, letterSpacing:"-0.01em" }}>{ph.label}</span>
                    <span style={{ fontSize:"0.6rem", color:T.muted }}>Stages {ph.stages}</span>
                    <div style={{ flex:1, height:1, background:`${ph.color}18` }}/>
                    <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                      <div style={{ width:40, height:3, background:T.border, borderRadius:99, overflow:"hidden" }}>
                        <div style={{ height:"100%", width:`${pd?.pct || 0}%`, background:ph.color, borderRadius:99 }}/>
                      </div>
                      <span style={{ fontSize:"0.65rem", fontWeight:700, color:ph.color }}>{pd?.pct || 0}%</span>
                    </div>
                  </div>

                  {/* Stages */}
                  <div style={{ display:"grid", gap:"0.5rem" }}>
                    {stages.map(st=>{
                      const gi = CURRICULUM.indexOf(st);
                      const ss = stageStats(st);
                      const unlocked = isUnlocked(gi);
                      const isOpen = openStage===st.stage;
                      const tab = stageTabs[st.stage]||"learn";
                      const complete = ss.pct===100;

                      return (
                        <div key={st.stage} style={{ background:isOpen?`${ph.color}08`:T.surface, border:`1px solid ${isOpen?ph.color+"30":T.border}`, borderRadius:12, overflow:"hidden", transition:"border-color .2s,background .2s", opacity:unlocked?1:0.45 }}>
                          {/* Stage header */}
                          <button onClick={()=>unlocked&&setOpenStage(isOpen?null:st.stage)} disabled={!unlocked}
                            style={{ width:"100%", padding:"0.85rem 1.05rem", display:"flex", alignItems:"center", gap:"0.85rem", background:"transparent", border:"none", color:"inherit", textAlign:"left" }}>
                            {/* Badge */}
                            <div style={{ width:34, height:34, minWidth:34, borderRadius:8, border:`1.5px solid ${complete?ph.color:unlocked?ph.color+"45":T.border}`, background:complete?ph.color+"18":T.raised, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .2s", flexShrink:0 }}>
                              {!unlocked ? <span style={{ fontSize:"0.8rem" }}>🔒</span>
                               : complete ? <span style={{ color:ph.color, fontSize:"0.85rem", fontWeight:700 }}>✓</span>
                               : <span style={{ color:ph.color+"99", fontSize:"0.75rem", fontWeight:700 }}>{st.stage}</span>}
                            </div>
                            {/* Info */}
                            <div style={{ flex:1, minWidth:0 }}>
                              <div style={{ display:"flex", alignItems:"center", gap:"0.45rem", flexWrap:"wrap" }}>
                                <span style={{ fontFamily:"'Epilogue',sans-serif", fontWeight:700, fontSize:"0.85rem", color:T.heading }}>{st.title}</span>
                                <span style={{ fontSize:"0.58rem", padding:"0.1rem 0.38rem", background:T.raised, color:T.muted, borderRadius:4, border:`1px solid ${T.border}` }}>
                                  {ss.tc}c · {ss.tl}t · {ss.tp}p
                                </span>
                              </div>
                              <div style={{ fontSize:"0.65rem", color:T.muted, marginTop:"0.12rem" }}>{st.subtitle}</div>
                              {/* Mini bars */}
                              <div style={{ display:"flex", gap:"0.3rem", marginTop:"0.4rem", alignItems:"center" }}>
                                {[
                                  {done:ss.dc,total:ss.tc,op:"1"},
                                  {done:ss.dl,total:ss.tl,op:"0.7"},
                                  {done:ss.dp,total:ss.tp,op:"0.5"},
                                ].map((bar,bi)=>(
                                  <div key={bi} style={{ width:52, height:2, background:T.border, borderRadius:99, overflow:"hidden" }}>
                                    <div style={{ height:"100%", width:`${Math.round((bar.done/bar.total)*100)}%`, background:ph.color, opacity:bar.op, borderRadius:99, transition:"width .35s" }}/>
                                  </div>
                                ))}
                                <span style={{ fontSize:"0.6rem", fontWeight:700, color:ss.pct>0?ph.color:T.muted, marginLeft:"auto", minWidth:"2rem", textAlign:"right" }}>{ss.pct}%</span>
                              </div>
                            </div>
                            <span style={{ color:T.muted, fontSize:"0.65rem", transform:isOpen?"rotate(180deg)":"none", transition:"transform .22s", flexShrink:0 }}>▼</span>
                          </button>

                          {/* Expanded body */}
                          {isOpen && (
                            <div className="fi">
                              {/* Unlock hint */}
                              {!isUnlocked(gi+1) && gi<CURRICULUM.length-1 && (
                                <div style={{ margin:"0 1.05rem 0.6rem", padding:"0.4rem 0.7rem", background:"rgba(210,153,34,0.07)", border:"1px solid rgba(210,153,34,0.18)", borderRadius:7, fontSize:"0.65rem", color:"#9a6e00", display:"flex", gap:"0.5rem", alignItems:"center" }}>
                                  ⚡ Complete 40% to unlock <strong style={{ color:T.phases.intermediate.color }}>Stage {st.stage+1}</strong>
                                </div>
                              )}

                              {/* Tab bar */}
                              <div style={{ display:"flex", gap:"0.25rem", padding:"0 1.05rem 0.55rem" }}>
                                {([
                                  ["learn",`🎯 Learn (${ss.dl}/${ss.tl})`],
                                  ["concepts",`📖 Concepts (${ss.dc}/${ss.tc})`],
                                  ["practice",`⚡ Problems (${ss.dp}/${ss.tp})`]
                                ] as [TabType, string][]).map(([t,label])=>(
                                  <button key={t} onClick={()=>setStageTabs(p=>({...p,[st.stage]:t}))} style={{ padding:"0.28rem 0.7rem", borderRadius:6, border:tab===t?`1px solid ${ph.color}45`:`1px solid transparent`, background:tab===t?ph.color+"14":"transparent", color:tab===t?ph.color:T.subtle, fontSize:"0.67rem" }}>
                                    {label}
                                  </button>
                                ))}
                              </div>

                              <div style={{ padding:"0 1.05rem 1.05rem" }}>
                                {/* LEARN tab */}
                                {tab==="learn" && (
                                  <div style={{ display:"grid", gap:"0.25rem" }}>
                                    {st.learn.map((item,i)=>{
                                      const done=learns[`${st.stage}-l-${i}`];
                                      return (
                                        <label key={i} className="hov-row" onClick={()=>toggleL(st.stage,i)} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem", padding:"0.45rem 0.55rem", borderRadius:7, cursor:"pointer", background:done?ph.color+"07":"transparent", transition:"background .15s" }}>
                                          <Checkbox done={done} color={ph.color}/>
                                          <span style={{ fontSize:"0.77rem", color:done?T.muted:T.strong, textDecoration:done?"line-through":"none", lineHeight:1.55, transition:"all .15s" }}>{item}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* CONCEPTS tab */}
                                {tab==="concepts" && (
                                  <div style={{ display:"grid", gap:"0.25rem" }}>
                                    {st.concepts.map((item,i)=>{
                                      const done=concepts[`${st.stage}-c-${i}`];
                                      return (
                                        <label key={i} className="hov-row" onClick={()=>toggleC(st.stage,i)} style={{ display:"flex", alignItems:"flex-start", gap:"0.6rem", padding:"0.45rem 0.55rem", borderRadius:7, cursor:"pointer", background:done?ph.color+"07":"transparent", transition:"background .15s" }}>
                                          <Checkbox done={done} color={ph.color}/>
                                          <span style={{ fontSize:"0.77rem", color:done?T.muted:T.body, textDecoration:done?"line-through":"none", lineHeight:1.55, transition:"all .15s" }}>{item}</span>
                                        </label>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* PRACTICE tab */}
                                {tab==="practice" && (
                                  <div style={{ display:"grid", gap:"0.3rem" }}>
                                    {st.practice.map((prob,i)=>{
                                      const done=probs[`${st.stage}-p-${i}`];
                                      return (
                                        <div key={i} className="hov-row" onClick={()=>toggleP(st.stage,i)} style={{ display:"flex", alignItems:"center", gap:"0.6rem", padding:"0.5rem 0.65rem", borderRadius:8, background:done?ph.color+"07":T.raised, border:`1px solid ${done?ph.color+"25":T.border}`, cursor:"pointer", transition:"all .15s" }}>
                                          <Checkbox done={done} color={ph.color}/>
                                          <a href={prob.link} target="_blank" rel="noreferrer" onClick={(e: React.MouseEvent<HTMLAnchorElement>)=>e.stopPropagation()} style={{ flex:1, fontSize:"0.77rem", fontWeight:500, color:done?T.subtle:T.strong }} onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>)=>e.currentTarget.style.color=ph.color} onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>)=>e.currentTarget.style.color=done?T.subtle:T.strong}>
                                            {prob.name} <span style={{ fontSize:"0.6rem", opacity:0.5 }}>↗</span>
                                          </a>
                                          <span style={{ fontSize:"0.58rem", padding:"0.1rem 0.4rem", borderRadius:99, background:T.raised, color:T.subtle, border:`1px solid ${T.border}`, whiteSpace:"nowrap", flexShrink:0 }}>{prob.tag}</span>
                                          <span style={{ fontSize:"0.58rem", padding:"0.1rem 0.4rem", borderRadius:99, background:T.diff[prob.difficulty].bg, color:T.diff[prob.difficulty].fg, fontWeight:700, whiteSpace:"nowrap", flexShrink:0 }}>{prob.difficulty}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div style={{ textAlign:"center", fontSize:"0.58rem", color:T.border, letterSpacing:"0.14em", textTransform:"uppercase", marginTop:"1rem" }}>
              Progress auto-saved · 18 stages · {totals.allC} concepts · {totals.allL} tasks · {totals.allP} problems
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────
function Checkbox({ done, color }: { done?: boolean; color: string }) {
  return (
    <div style={{ width:15, height:15, minWidth:15, borderRadius:4, border:`1.5px solid ${done?color:T.borderHi}`, background:done?color+"22":"transparent", display:"flex", alignItems:"center", justifyContent:"center", marginTop:2, transition:"all .15s", flexShrink:0 }}>
      {done && <span style={{ color, fontSize:"0.55rem", fontWeight:800, lineHeight:1 }}>✓</span>}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize:"0.62rem", color:T.muted, letterSpacing:"0.12em", textTransform:"uppercase", fontWeight:600 }}>{children}</div>;
}