import React, { useState } from 'react';
import { 
  MessageSquare, 
  Star, 
  Send, 
  CheckCircle2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FEEDBACK_CATEGORIES = [
  "Hostel facilities",
  "Water",
  "Electricity",
  "Mess",
  "Cleaning",
  "Maintenance",
  "Overall hostel"
];

export const StudentFeedback = ({ feedbackList, onSubmitFeedback }) => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState("Water");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    await onSubmitFeedback({
      studentId: currentUser?.id || "usr-std-1",
      studentName: currentUser?.name || "Rahul Sharma",
      category,
      rating,
      comment
    });

    setComment("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Institutional Experience & Facility Feedback
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Share your ratings and feedback on hostel amenities, electricity reliability, water supply, and mess quality.
        </p>
      </div>

      {/* Feedback Submission Form */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        
        {submitted && (
          <div className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Thank you! Your feedback has been forwarded to the Warden Committee.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Category Dropdown (All 7 prompt categories) */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Feedback Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FEEDBACK_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`p-2.5 rounded-xl border text-center font-semibold text-xs transition ${
                    category === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Rating (1 to 5 Stars)
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className="p-1 text-2xl transition hover:scale-110"
                >
                  <Star 
                    className={`w-7 h-7 ${
                      star <= rating 
                        ? 'text-amber-400 fill-amber-400' 
                        : 'text-slate-300 dark:text-slate-600'
                    }`} 
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                {rating === 5 ? '🌟 Excellent' : (rating >= 4 ? '👍 Good' : (rating >= 3 ? '👌 Average' : '⚠️ Needs Improvement'))}
              </span>
            </div>
          </div>

          {/* Qualitative Comment */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Your Suggestions & Remarks
            </label>
            <textarea
              rows="3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Water pressure on 2nd floor has improved significantly after sensor install..."
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Feedback</span>
          </button>
        </form>
      </div>

      {/* Recent Feedback Submissions */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Community Feedback Stream
        </h3>

        <div className="space-y-3">
          {feedbackList.map((f) => (
            <div 
              key={f.id}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 dark:text-slate-200">{f.category}</span>
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: f.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 italic">
                "{f.comment}"
              </p>
              <div className="text-[10px] text-slate-400 flex items-center justify-between">
                <span>By: {f.studentName}</span>
                <span>{new Date(f.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
