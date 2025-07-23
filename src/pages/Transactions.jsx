import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Filter,
  Download,
  Search,
  Calendar,
  Clock
} from "lucide-react";

const Transactions = () => {
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "credit",
      amount: 2500.00,
      description: "Salary Deposit",
      recipient: "HR Department",
      date: "2024-01-15",
      time: "09:30 AM",
      status: "completed",
      category: "Income"
    },
    {
      id: 2,
      type: "debit",
      amount: 120.50,
      description: "Grocery Store",
      recipient: "Super Market Plus",
      date: "2024-01-14",
      time: "02:15 PM",
      status: "completed",
      category: "Shopping"
    },
    {
      id: 3,
      type: "debit",
      amount: 85.00,
      description: "Gas Station",
      recipient: "Shell Station",
      date: "2024-01-14",
      time: "10:45 AM",
      status: "completed",
      category: "Transportation"
    },
    {
      id: 4,
      type: "credit",
      amount: 150.00,
      description: "Refund - Online Store",
      recipient: "TechMart",
      date: "2024-01-13",
      time: "04:20 PM",
      status: "completed",
      category: "Refund"
    },
    {
      id: 5,
      type: "debit",
      amount: 45.00,
      description: "Coffee Shop",
      recipient: "Daily Grind Cafe",
      date: "2024-01-13",
      time: "08:30 AM",
      status: "pending",
      category: "Food & Dining"
    }
  ]);

  const [sendMoney, setSendMoney] = useState({
    recipient: "",
    amount: "",
    description: "",
    fromAccount: ""
  });

  const { toast } = useToast();

  const handleSendMoney = () => {
    if (!sendMoney.recipient || !sendMoney.amount || !sendMoney.fromAccount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: "debit",
      amount: parseFloat(sendMoney.amount),
      description: sendMoney.description || `Transfer to ${sendMoney.recipient}`,
      recipient: sendMoney.recipient,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending",
      category: "Transfer"
    };

    setTransactions([newTransaction, ...transactions]);
    setSendMoney({ recipient: "", amount: "", description: "", fromAccount: "" });
    setIsSendDialogOpen(false);

    toast({
      title: "Transfer Initiated",
      description: `$${parseFloat(sendMoney.amount).toFixed(2)} sent to ${sendMoney.recipient}`
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success";
      case "pending":
        return "bg-warning/10 text-warning";
      case "failed":
        return "bg-destructive/10 text-destructive";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
            <p className="text-muted-foreground mt-1">
              Send money and view your transaction history
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </Button>
            <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Money</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Send Money</DialogTitle>
                  <DialogDescription>
                    Transfer funds to another account or recipient.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fromAccount">From Account</Label>
                    <Select value={sendMoney.fromAccount} onValueChange={(value) => setSendMoney({...sendMoney, fromAccount: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Primary Checking (****1234)</SelectItem>
                        <SelectItem value="savings">High Yield Savings (****5678)</SelectItem>
                        <SelectItem value="business">Business Account (****9012)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient</Label>
                    <Input
                      id="recipient"
                      placeholder="Enter recipient name or account number"
                      value={sendMoney.recipient}
                      onChange={(e) => setSendMoney({...sendMoney, recipient: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={sendMoney.amount}
                      onChange={(e) => setSendMoney({...sendMoney, amount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="What's this transfer for?"
                      value={sendMoney.description}
                      onChange={(e) => setSendMoney({...sendMoney, description: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendMoney}>
                    Send Money
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                $850.50
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Received</CardTitle>
              <ArrowDownLeft className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                $2,650.00
              </div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                $45.00
              </div>
              <p className="text-xs text-muted-foreground">
                1 transaction
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View and search your recent transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Transactions</SelectItem>
                  <SelectItem value="credit">Money In</SelectItem>
                  <SelectItem value="debit">Money Out</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Transactions List */}
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {transaction.recipient}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <Badge className={`mt-1 ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transactions found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Transactions;