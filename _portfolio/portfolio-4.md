---
title: "Aneurysm Segmentation"
excerpt: "Short description of portfolio item number 1<br/><img src='/images/image_lin2023high_1.png'>"
collection: portfolio
---

This is an item in your portfolio. It can be have images or nice text. If you name the file .md, it will be parsed as markdown. If you name the file .html, it will be parsed as HTML. 


### Introduction

The assessment of aneurysm rupture risk assists with pre-operative treatment planning and enables in-silico investigation of cerebral hemodynamics within and in the vicinity of aneurysms. However, ensuring precise and robust segmentation of cerebral vessels and aneurysms in neuroimaging modalities such as three-dimensional rotational angiography (3DRA) is challenging. The aneurysm constitutes a small proportion of the image volume, resulting in a large class imbalance (relative to surrounding brain tissue). Additionally, aneurysms and vessels have similar image/appearance characteristics, making it challenging to distinguish the aneurysm sac from the vessel lumen.

![Editing a markdown file for a talk](/images/image_lin2023high_21.png)

### Result

The surface meshes generated using the vessel and aneurysm segmentations predicted at different stages of our segmentation pipeline are shown in Fig. These figures demonstrate the utility of the proposed post-processing steps to suppress false-positive predictions for the aneurysm and refine the same. 
Cropped vessels share similarities in topology and appearance with aneurysms near patch boundaries. Therefore, initial segmentation using the proposed multi-class segmentation network (step 2 in Fig) is prone to incorrectly labeling tortuous vessels and vessels near patch boundaries as aneurysms (example in the third column of Fig). These false-positive predictions for aneurysms are artifacts of patch-based learning due to the limited spatial context available to the network during feature learning and can be effectively reduced using majority voting. The resulting aneurysm segmentation following the suppression of false positives by majority voting (see the fourth column of Fig) is used to provide aneurysm location and extract patches in the neighborhood, which are fed back into the multi-class network to refine the segmentation near the aneurysm (called' self-refinement). The improvement in aneurysm segmentation accuracy afforded by these two post-processing steps involving majority voting and self-refinement is also highlighted for the test set in Fig.

![Editing a markdown file for a talk](/images/image_lin2023high_2.png)
3D renderings of obtained segmentations after different steps.







