// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var noteGenerator = {
    requestNote: function () {
        document.getElementById("lbl-note").textContent = "Hi!";
    }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
    noteGenerator.requestNote();
});
