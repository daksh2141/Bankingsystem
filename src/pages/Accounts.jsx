import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Eye, 
  EyeOff, 
  Edit3, 
  Trash2, 
  CreditCard,
  Wallet,
  PiggyBank,
  Building2
} from "lucide-react";

const Accounts = () => {
  const [showBalances, setShowBalances] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "Primary Checking",
      type: "checking",
      balance: 12450.75,
      accountNumber: "****1234",
      status: "active",
      bank: "BankSys"
    },
    {
      id: 2,
      name: "High Yield Savings",
      type: "savings",
      balance: 25890.50,
      accountNumber: "****5678",
      status: "active",
      bank: "BankSys"
    },
    {
      id: 3,
      name: "Business Account",
      type: "business",
      balance: 8750.25,
      accountNumber: "****9012",
      status: "active",
      bank: "BankSys"
    }
  ]);

  const [newAccount, setNewAccount] = useState({
    name: "",
    type: "",
    initialDeposit: ""
  });

  const { toast } = useToast();

  const getAccountIcon = (type) => {
    switch (type) {
      case "checking":
        return CreditCard;
      case "savings":
        return PiggyBank;
      case "business":
        return Building2;
      default:
        return Wallet;
    }
  };

  const getAccountColor = (type) => {
    switch (type) {
      case "checking":
        return "bg-primary/10 text-primary";
      case "savings":
        return "bg-success/10 text-success";
      case "business":
        return "bg-accent/10 text-accent";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  const handleAddAccount = () => {
    if (!newAccount.name || !newAccount.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const account = {
      id: Date.now(),
      name: newAccount.name,
      type: newAccount.type,
      balance: parseFloat(newAccount.initialDeposit) || 0,
      accountNumber: `****${Math.floor(1000 + Math.random() * 9000)}`,
      status: "active",
      bank: "BankSys"
    };

    setAccounts([...accounts, account]);
    setNewAccount({ name: "", type: "", initialDeposit: "" });
    setIsAddDialogOpen(false);

    toast({
      title: "Account Created",
      description: `${account.name} has been successfully created.`
    });
  };

  const handleDeleteAccount = (accountId) => {
    setAccounts(accounts.filter(account => account.id !== accountId));
    toast({
      title: "Account Deleted",
      description: "Account has been successfully deleted."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your bank accounts and view balances
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowBalances(!showBalances)}
              className="flex items-center space-x-2"
            >
              {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showBalances ? 'Hide' : 'Show'} Balances</span>
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Account</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Account</DialogTitle>
                  <DialogDescription>
                    Create a new bank account to manage your finances.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="accountName">Account Name</Label>
                    <Input
                      id="accountName"
                      placeholder="e.g., Emergency Savings"
                      value={newAccount.name}
                      onChange={(e) => setNewAccount({...newAccount, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Account Type</Label>
                    <Select value={newAccount.type} onValueChange={(value) => setNewAccount({...newAccount, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking Account</SelectItem>
                        <SelectItem value="savings">Savings Account</SelectItem>
                        <SelectItem value="business">Business Account</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="initialDeposit">Initial Deposit (Optional)</Label>
                    <Input
                      id="initialDeposit"
                      type="number"
                      placeholder="0.00"
                      value={newAccount.initialDeposit}
                      onChange={(e) => setNewAccount({...newAccount, initialDeposit: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddAccount}>
                    Create Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Accounts Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => {
            const Icon = getAccountIcon(account.type);
            
            return (
              <Card key={account.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getAccountColor(account.type)}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>{account.accountNumber}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={account.status === 'active' ? 'default' : 'secondary'}>
                    {account.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="text-2xl font-bold">
                        {showBalances ? `$${account.balance.toLocaleString()}` : "****"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="capitalize">
                        {account.type}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteAccount(account.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of all your accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Accounts</p>
                  <p className="text-2xl font-bold">{accounts.length}</p>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <p className="text-2xl font-bold text-success">
                    {showBalances 
                      ? `$${accounts.reduce((sum, account) => sum + account.balance, 0).toLocaleString()}`
                      : "****"
                    }
                  </p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Active Accounts</p>
                  <p className="text-2xl font-bold text-primary">
                    {accounts.filter(account => account.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Accounts;