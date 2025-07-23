import Layout from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  DollarSign, 
  CreditCard, 
  TrendingUp,
  Eye,
  EyeOff,
  Plus,
  Send
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { user } = useAuth();

  // Mock data - in real app this would come from API
  const accountData = {
    balance: 12450.75,
    accountNumber: "****1234",
    recentTransactions: [
      {
        id: 1,
        type: "credit",
        amount: 2500.00,
        description: "Salary Deposit",
        date: "2024-01-15",
        time: "09:30 AM"
      },
      {
        id: 2,
        type: "debit",
        amount: 120.50,
        description: "Grocery Store",
        date: "2024-01-14",
        time: "02:15 PM"
      },
      {
        id: 3,
        type: "debit",
        amount: 85.00,
        description: "Gas Station",
        date: "2024-01-14",
        time: "10:45 AM"
      },
      {
        id: 4,
        type: "credit",
        amount: 150.00,
        description: "Refund - Online Store",
        date: "2024-01-13",
        time: "04:20 PM"
      }
    ]
  };

  const stats = [
    {
      title: "Total Balance",
      value: showBalance ? `$${accountData.balance.toLocaleString()}` : "****",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSign
    },
    {
      title: "This Month Spending",
      value: "$1,245.80",
      change: "-8.2%",
      changeType: "negative", 
      icon: CreditCard
    },
    {
      title: "Savings Goal",
      value: "75%",
      change: "+5.2%",
      changeType: "positive",
      icon: TrendingUp
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name?.split(' ')[0] || 'John'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening with your accounts today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button asChild className="flex items-center space-x-2">
              <Link to="/transactions">
                <Send className="w-4 h-4" />
                <span>Send Money</span>
              </Link>
            </Button>
            <Button variant="outline" asChild className="flex items-center space-x-2">
              <Link to="/accounts">
                <Plus className="w-4 h-4" />
                <span>Add Account</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Main Balance Card */}
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-lg font-medium">Primary Account</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Account {accountData.accountNumber}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {showBalance ? `$${accountData.balance.toLocaleString()}` : "****"}
            </div>
            <p className="text-sm text-primary-foreground/80 mt-1">
              Available Balance
            </p>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${
                    stat.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  }`}>
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your latest account activity
              </CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link to="/transactions">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accountData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border"
                >
                  <div className="flex items-center space-x-3">
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="w-5 h-5 text-primary" />
                <span>Send Money</span>
              </CardTitle>
              <CardDescription>
                Transfer funds to another account instantly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>Manage Cards</span>
              </CardTitle>
              <CardDescription>
                View and manage your debit and credit cards
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;