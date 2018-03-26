# 数据结构

## 数组
- 二分查找

        //递归
        function binarySearch(target, arr = [], start, end) {
            if(start > end) {
                return -1;
            }

            let pivot = (start + end) / 2 | 0;

            start = start || 0,
            end = end || arr.length - 1;

            if(target === arr[pivot]) {
                return pivot;
            }else if(target > arr[pivot]){
                return binarySearch(target, arr, pivot + 1, end);
            }else {
                return binarySearch(target, arr, start, pivot - 1);
            }

            return -1;
        }

## 链表

## 堆栈

## 树

## 图

## 排序
- 冒泡排序 O(n^2)

        function bubbleSort(arr) {
            if(!arr || !arr.length) {
                return arr;
            }

            let len = arr.length;        

            for(let i = 0;i < len;i ++){
                for(let j = i + 1;j < len; j ++){
                    if(arr[i] > arr[j]) {
                        [arr[i],arr[j]] = [arr[j],arr[i]];
                    }
                }
            }

            return arr;
        }

- 快速排序 O(n*log2n)

        function quickSort(arr) {
            if(!arr || !arr.length || arr.length <= 1) {
                return arr;
            }

            let len = arr.length,
                pivotIndex = len / 2 | 0,
                pivot = arr.splice(pivotIndex,1)[0],//基准数
                left = [],//左数组
                right = [];//右数组

            //比基准小的放在left，比基准大的放在right
            for(let i = 0;i < len - 1;i ++) {
                let cur = arr[i];

                if(cur <= pivot) {
                    left.push(cur);
                }else{
                    right.push(cur);
                }
            }

            return quickSort(left).concat(pivot, quickSort(right));
        }