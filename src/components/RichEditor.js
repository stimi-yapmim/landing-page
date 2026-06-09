"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Bold, 
  Italic, 
  Underline, 
  Heading2, 
  Heading3, 
  Quote, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon, 
  Image as ImageIcon,
  Eraser,
  Eye,
  Code
} from "lucide-react";
import { uploadImageAction } from "@/app/actions/newsActions";

export default function RichEditor({ value, onChange }) {
  const [activeTab, setActiveTab] = useState("visual"); // "visual" or "teks"
  const editorRef = useRef(null);
  const isMounted = useRef(false);
  const fileInputRef = useRef(null);

  // Handle local image file uploads and save them to public/images
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target.result;
        try {
          const res = await uploadImageAction(base64Data);
          if (res.success) {
            execCmd("insertImage", res.url);
          } else {
            alert("Gagal mengunggah gambar: " + res.error);
          }
        } catch (err) {
          console.error("Upload error:", err);
          alert("Kesalahan saat mengunggah gambar ke server.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add image by URL link helper
  const addImageUrl = () => {
    const url = prompt("Masukkan URL Gambar:");
    if (url) {
      execCmd("insertImage", url);
    }
  };

  // Set initial value only on mount
  useEffect(() => {
    if (editorRef.current && !isMounted.current) {
      editorRef.current.innerHTML = value || "";
      isMounted.current = true;
    }
  }, [value]);

  // If the value is updated from outside (e.g. loading async data), sync it
  useEffect(() => {
    if (editorRef.current && isMounted.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value, activeTab]);

  const handleEditorInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const handleTeksChange = (e) => {
    onChange(e.target.value);
  };

  // Execute native rich text format commands
  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    handleEditorInput();
  };

  // Add hyper-link helper
  const addLink = () => {
    const url = prompt("Masukkan URL Link:");
    if (url) {
      execCmd("createLink", url);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-brand-navy-900 shadow-sm flex flex-col">
      
      {/* ── Editor Tabs & Controls Header ── */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-4 py-2 bg-slate-50 dark:bg-slate-900/40 select-none">
        
        {/* Editor Modes Toggles */}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab("visual")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "visual"
                ? "bg-brand-cyan-500 text-white shadow-md shadow-brand-cyan-500/10"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-navy-850"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Visual</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("teks")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "teks"
                ? "bg-brand-cyan-500 text-white shadow-md shadow-brand-cyan-500/10"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-brand-navy-850"
            }`}
          >
            <Code className="h-3.5 w-3.5" />
            <span>Teks (HTML)</span>
          </button>
        </div>

        {/* Database Sync tag */}
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden sm:block">
          Wordpress-Style Editor
        </div>

      </div>

      {/* ── Formatting Toolbar (Only in Visual Mode) ── */}
      {activeTab === "visual" && (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800 select-none">
          
          {/* Group 1: Typography styles */}
          <button
            type="button"
            onClick={() => execCmd("bold")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Bold (Tebal)"
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("italic")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Italic (Miring)"
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("underline")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Underline (Garis Bawah)"
          >
            <Underline className="h-4 w-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Group 2: Headings and Paragraphs */}
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<h2>")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer font-bold text-xs uppercase"
            title="Heading 2 (H2)"
          >
            <Heading2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<h3>")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer font-bold text-xs uppercase"
            title="Heading 3 (H3)"
          >
            <Heading3 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<p>")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer font-black text-xs"
            title="Paragraph (Paragraf)"
          >
            P
          </button>
          <button
            type="button"
            onClick={() => execCmd("formatBlock", "<blockquote>")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Kutipan (Blockquote)"
          >
            <Quote className="h-4 w-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Group 3: Lists */}
          <button
            type="button"
            onClick={() => execCmd("insertUnorderedList")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("insertOrderedList")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Group 4: Alignments */}
          <button
            type="button"
            onClick={() => execCmd("justifyLeft")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Align Left (Rata Kiri)"
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("justifyCenter")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Align Center (Rata Tengah)"
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => execCmd("justifyRight")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Align Right (Rata Kanan)"
          >
            <AlignRight className="h-4 w-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Group 5: Links, Images & Formatting actions */}
          <button
            type="button"
            onClick={addLink}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Masukkan Link"
          >
            <LinkIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer"
            title="Unggah Gambar dari Komputer"
          >
            <ImageIcon className="h-4 w-4" />
          </button>
          
          <button
            type="button"
            onClick={addImageUrl}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer font-bold text-[10px] uppercase shrink-0"
            title="Masukkan Gambar via URL"
          >
            IMG URL
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => execCmd("removeFormat")}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-brand-navy-800 text-slate-600 dark:text-slate-350 cursor-pointer ml-auto"
            title="Bersihkan Format"
          >
            <Eraser className="h-4 w-4" />
          </button>

        </div>
      )}

      {/* ── Editor Canvas ── */}
      <div className="flex-1 min-h-[360px] relative">
        
        {/* Visual editable area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleEditorInput}
          className={`w-full min-h-[360px] p-6 focus:outline-none dark:text-slate-200 leading-relaxed font-sans overflow-y-auto prose dark:prose-invert max-w-none prose-sm outline-none ${
            activeTab === "visual" ? "block" : "hidden"
          }`}
          style={{ minHeight: "360px" }}
          placeholder="Mulai menulis berita..."
        />

        {/* Teks HTML textarea */}
        <textarea
          value={value || ""}
          onChange={handleTeksChange}
          className={`w-full min-h-[360px] p-6 bg-slate-900 text-slate-100 font-mono text-xs focus:outline-none leading-relaxed outline-none resize-none border-0 ${
            activeTab === "teks" ? "block" : "hidden"
          }`}
          style={{ minHeight: "360px" }}
          placeholder="<!-- Tulis HTML Raw di sini -->"
        />

      </div>

      {/* ── Editor Footer Status ── */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-[10px] text-slate-400 font-bold select-none flex justify-between">
        <span>MODE: {activeTab === "visual" ? "VISUAL WYSIWYG" : "HTML CODE"}</span>
        <span>HTML SIZE: {(value || "").length} karakter</span>
      </div>

    </div>
  );
}
