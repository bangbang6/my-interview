## 1.树的diff算法复杂度o(n3)

第一遍历第一个树 第二遍历第二个树 第三排序

## 2.优化到o(n)

1.只比较同一层,深度优先先序遍历

2.tag或者key不相同 则直接删掉重建，不在比较(认为下面不可能相同)

3**.tag和key相同**，则认为是相同的节点，然后比较子元素 updateChidren



## 3.updateChildren流程

首尾各两个指针，当指针重合啦表示结束

1.首首

2.尾尾

3.首尾

4.尾首

命中条件为tag和key都相同，命中则两个指针都往中间走

假如以上四个都没命中

把新节点的key一个一个对比老节点的key

没对应上的话:新建元素，插入到老节点

如果对应上拉:再看tag是否相等，不等则新建元素插入，相等就插入到oldIdx这个位置