import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const users = ["You", "Your Husband"];

export default function BookClubApp() {
  const [currentUser, setCurrentUser] = useState("You");
  const [prompts, setPrompts] = useState([]);
  const [newPrompt, setNewPrompt] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);

  const currentTurn = users[(weekNumber - 1) % users.length];

  const handleSubmit = () => {
    if (!newPrompt.trim()) return;
    const promptEntry = {
      week: weekNumber,
      author: currentUser,
      content: newPrompt.trim(),
    };
    setPrompts([promptEntry, ...prompts]);
    setNewPrompt("");
    setWeekNumber(weekNumber + 1);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 Weekly Book Club Prompts</h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Logged in as:</label>
        <select
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          className="mb-4 p-2 border rounded"
        >
          {users.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <p className="mb-2 font-medium">Week {weekNumber} — It's <strong>{currentTurn}</strong>'s turn to write a prompt.</p>
        {currentUser === currentTurn ? (
          <div>
            <Textarea
              value={newPrompt}
              onChange={(e) => setNewPrompt(e.target.value)}
              placeholder="Write your book prompt here..."
              className="mb-2"
            />
            <Button onClick={handleSubmit}>Submit Prompt</Button>
          </div>
        ) : (
          <p className="text-gray-600">Waiting for {currentTurn} to submit this week's prompt.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📖 Prompt History</h2>
        {prompts.length === 0 ? (
          <p className="text-gray-500">No prompts yet.</p>
        ) : (
          prompts.map((prompt) => (
            <Card key={prompt.week} className="mb-3">
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">Week {prompt.week} — {prompt.author}</p>
                <p className="mt-2">{prompt.content}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
