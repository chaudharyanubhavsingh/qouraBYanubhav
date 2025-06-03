... existing imports ...

export default function RegisterPage() {
  ... existing code ...

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || password !== confirmPassword) return;

    setLoading(true);
    
    try {
      await register(name, email, password);
      router.push("/");
    } catch {
      // Handle registration error
      setLoading(false);
    }
  };

  ... existing code ...
}
</update_file_sections>